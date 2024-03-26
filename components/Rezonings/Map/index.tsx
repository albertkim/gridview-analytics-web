import React, { useEffect, useState, useRef } from 'react'
import { RezoningPanelRow } from './RezoningPanelRow'
import { APIService } from '@/services/APIService'
import { IFullRecord, IListRecord } from '@/services/Models'
import { Modal, message, Alert } from 'antd'
import { calculateCircleRadius, defaultGoogleMapOptions, getBuildingTypeColours } from '@/services/MapUtilities'
import { FullRezoningContents } from '../Shared/FullRezoningContents'
import { MapFilterModel, IMapFilter, filterRecords } from '@/components/MapFilterModel'
import { RezoningMapFilter } from '../Shared/RezoningMapFilter'
import { CityStatistics } from './CityStatistics'

const mapFilter = new MapFilterModel()

export function RezoningsMap() {

  const [filter, setFilter] = useState<IMapFilter>(mapFilter.getFilter())
  const [listRecords, setListRecords] = useState<IListRecord[] | null>(null)
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [circles, setCircles] = useState<google.maps.Circle[] | null>(null)

  // Used to select an item on the map (no modal)
  const [selectedRecord, setSelectedRecord] = useState<IFullRecord | null>(null)

  // Used for full details modal
  const [selectedModalFullRecord, setSelectedModalFullRecord] = useState<IFullRecord | null>(null)

  // Refs
  const mapRef = useRef<HTMLDivElement>(null)
  const circlesRef = useRef(circles)

  useEffect(() => {
    async function getListRecords() {
      try {
        const rezonings = await APIService.getListRecords('rezonings')
        setListRecords(rezonings.data)
      } catch (error) {
        message.error('Failed to get data from server')
      }
    }
    getListRecords()
  }, [])

  // Google Maps - Update the circles ref whenever the circles state changes
  useEffect(() => {
    circlesRef.current = circles
  }, [circles])

  // Google Maps - Initializing the map and adding the zoom listener
  useEffect(() => {
    if (mapRef.current && !map) {
      console.log('Initializing Google Maps')
      const initializedMap = new google.maps.Map(mapRef.current, defaultGoogleMapOptions)

      // Debounce to reduce zoom lagging
      const debounce = (func: (...args: any[]) => void, wait: number): (...args: any[]) => void => {
        let timeout: NodeJS.Timeout | null = null
      
        return function executedFunction(...args: any[]) {
          const later = () => {
            timeout = null
            func(...args)
          }
      
          if (timeout) {
            clearTimeout(timeout)
          }
          timeout = setTimeout(later, wait)
        }
      }

      // Add zoom listener
      const handleZoomChange = (): void => {
        const currentZoom = initializedMap.getZoom()
        circlesRef?.current?.forEach(circle => {
          circle.setRadius(calculateCircleRadius(currentZoom))
        })
      }
      const debouncedZoomHandler = debounce(handleZoomChange, 250)
      google.maps.event.addListener(initializedMap, 'zoom_changed', debouncedZoomHandler)

      setMap(initializedMap)
    }

    // Cleanup function
    return () => {
      circles?.forEach(circle => circle.setMap(null))
    }
  }, [mapRef, map, defaultGoogleMapOptions])

  // Google Maps - Handle records and circle updates
  useEffect(() => {
    if (map && listRecords) {
      // Clear existing circles
      circles?.forEach(circle => circle.setMap(null))

      const recordsWithCoordinates = listRecords
        .filter(record => record.location.latitude && record.location.longitude)
        .filter(record => !!record.buildingType)

      const filteredRezonings = filterRecords(recordsWithCoordinates, filter)

      const newCircles = (filteredRezonings || []).map(rezoning => {
        const newCircle = new google.maps.Circle({
          strokeColor: 'black',
          strokeOpacity: 0.0,
          strokeWeight: 0.5,
          fillColor: getBuildingTypeColours(rezoning.buildingType),
          fillOpacity: 0.8,
          map: map,
          center: { lat: rezoning.location.latitude!, lng: rezoning.location.longitude! },
          radius: calculateCircleRadius(map.getZoom())
        })
        google.maps.event.addListener(newCircle, 'click', () => {
          selectRecord(rezoning.id)
        })
        return newCircle
      })

      setCircles(newCircles)
    }
  }, [map, listRecords, filter])

  // If a record is selected, scroll to it on the right panel and show a bubble above the circle
  useEffect(() => {

    if (selectedRecord) {
      console.log(`${selectedRecord.id}: ${selectedRecord.address}`)
    }

    let selectedCircle: google.maps.Circle | null = null

    if (selectedRecord && circlesRef.current) {
      selectedCircle = circlesRef.current.find(circle => {
        const lat = circle.getCenter()?.lat()
        const lng = circle.getCenter()?.lng()
        return lat === selectedRecord.location.latitude && lng === selectedRecord.location.longitude
      }) || null
    }

    if (selectedRecord && circlesRef.current) {
      const selectedCircle = circlesRef.current.find(circle => {
        const lat = circle.getCenter()?.lat()
        const lng = circle.getCenter()?.lng()
        return lat === selectedRecord.location.latitude && lng === selectedRecord.location.longitude
      })

      if (selectedRecord && selectedCircle) {
        // Find the matching record list item in the right panel
        let selectedRecordListItem: HTMLElement | null = null
        const recordListItems = document.getElementsByClassName('rezoning-list-item')
        for (let i = 0; i < recordListItems.length; i++) {
          const div = recordListItems[i] as HTMLElement
          if (div.innerText.includes(selectedRecord.address)) {
            selectedRecordListItem = div
            break
          }
        }

        // Scroll to the selected rezoning list item
        if (selectedRecordListItem) {
          const rezoningRightPanel = document.getElementById('rezoning-right-panel-list')!
          rezoningRightPanel.scrollTo({
            top: selectedRecordListItem.offsetTop - 20,
            behavior: 'smooth'
          })
        }

        // Make the selected circle red
        selectedCircle.setOptions({
          fillColor: 'red'
        })
      }
    }

    return () => {
      // Revert selected circle color)
      if (selectedRecord && selectedCircle) {
        selectedCircle.setOptions({
          fillColor: getBuildingTypeColours(selectedRecord.buildingType)
        })
      }
    }

  }, [selectedRecord])

  const selectRecord = async function(recordId: string) {
    const fullRecord = await APIService.getRecordById(recordId)
    setSelectedRecord(fullRecord)
  }

  const sortedListRecords: IListRecord[] | null = filterRecords(listRecords, filter)

  return (
    <div>

      {/** Full details modal */}
      <Modal
        open={!!selectedModalFullRecord}
        onCancel={() => setSelectedModalFullRecord(null)}
        title={
          <>
            <span>{selectedModalFullRecord?.address} </span>
            <a
              className='text-muted text-decoration-underline'
              href={`https://www.google.com/maps/search/?api=1&query=${selectedModalFullRecord?.address}, ${selectedModalFullRecord?.city}}`}
              target='_blank'
              rel='noreferrer'
              >
              [open in Google Maps]
            </a>
          </>
        }
        footer={null}
        width={1000}>
        {
          !!selectedModalFullRecord && <FullRezoningContents rezoning={selectedModalFullRecord} />
        }
      </Modal>

      <div className='d-none d-sm-block' style={{position: 'relative', width: '100%', height: '90vh'}}>

        {/** Google Map div/ref */}
        <div ref={mapRef} style={{ width: '100%', height: '100%' }} />

        {/** Title, filters, and city metrics (underneath) */}
        <div id='rezoning-map-container'>

          <div id='rezoning-top-filter'>
            <h5 className='mb-3'>Gridview Premium (<a href='/rezonings/table'>go to table view</a>) {!listRecords && <span className='text-muted'>(loading...)</span>}</h5>
            <RezoningMapFilter mapFilterModel={mapFilter} onApply={(newFilter) => setFilter(newFilter)} />
          </div>

          {/* {rezonings && <div id='rezoning-left-metrics'><CityStatistics city='Vancouver' rezonings={rezonings} /></div>}
          {rezonings && <div id='rezoning-left-metrics'><CityStatistics city='Richmond' rezonings={rezonings} /></div>}
          {rezonings && <div id='rezoning-left-metrics'><CityStatistics city='Burnaby' rezonings={rezonings} /></div>}
          {rezonings && <div id='rezoning-left-metrics'><CityStatistics city='Surrey' rezonings={rezonings} /></div>} */}

        </div>

        {/** City left-hand metrics */}

        {/** Rezonings right-hand panel header */}
        <div id='rezoning-right-panel-header'>
          {
            !!sortedListRecords && (
              <>
                <h5>{sortedListRecords.length} rezonings found</h5>
                <div className='text-muted'>
                  <div>
                    {sortedListRecords.filter((r) => r.status === 'approved').length} approved
                  </div>
                </div>
              </>
            )
          }
        </div>

        {/** Rezonings right-hand panel list */}
        <div id='rezoning-right-panel-list'>
          {
            !!sortedListRecords && (
              sortedListRecords.map((listRecord) => (
                <div
                  key={listRecord.id}
                  // .rezoning-list-item is used in a useEffect to scroll to the selected rezoning
                  className='rezoning-list-item border border-light'
                  style={{cursor: 'pointer'}}
                  onClick={() => selectRecord(listRecord.id)}>
                  <div>
                    <RezoningPanelRow
                      listRecord={listRecord}
                      fullRecord={selectedRecord}
                      expanded={selectedRecord && selectedRecord.address === listRecord.address}
                      onFullDetailsClick={() => setSelectedModalFullRecord(selectedRecord)}
                    />
                  </div>

                </div>
              ))
            )
          }
        </div>

      </div>

      <br />

      <div className='container-fluid'>

        <div className='d-block d-sm-none mb-2'>
          <Alert type='info' message={
            <>
              <span>View on desktop for a complete map-based experience.</span>
              <br />
              <span><a href='/rezonings/table'>Go to the table view.</a></span>
            </>
          } />
        </div>

      </div>

    </div>
  )

}
