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

export function RezoningsMap({type}: {type: 'rezoning' | 'development permit'}) {

  const [filter, setFilter] = useState<IMapFilter>(mapFilter.getFilter())
  const [listRecords, setListRecords] = useState<IListRecord[] | null>(null)
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [circles, setCircles] = useState<google.maps.Circle[] | null>(null)

  // Used to select an item on the map and right panel (no modal)
  const [selectedRecord, setSelectedRecord] = useState<IListRecord | null>(null)

  // Used for full details modal
  const [selectedModalFullRecord, setSelectedModalFullRecord] = useState<IFullRecord | null>(null)

  // Refs
  const mapRef = useRef<HTMLDivElement>(null)
  const circlesRef = useRef(circles)

  useEffect(() => {
    async function getListRecords() {
      try {
        const apiRecordType = type === 'rezoning' ? 'rezonings' : 'development-permits'
        const rezonings = await APIService.getListRecords(apiRecordType)
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

      const filteredRecords = filterRecords(recordsWithCoordinates, filter)

      const newCircles = (filteredRecords || []).map(record => {
        const newCircle = new google.maps.Circle({
          strokeColor: 'black',
          strokeOpacity: 0.0,
          strokeWeight: 0.5,
          fillColor: getBuildingTypeColours(record.buildingType),
          fillOpacity: 0.8,
          map: map,
          center: { lat: record.location.latitude!, lng: record.location.longitude! },
          radius: calculateCircleRadius(map.getZoom())
        })
        google.maps.event.addListener(newCircle, 'click', () => {
          scrollToRecord(record.id)
          selectRecord(record)
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
        // Make the selected circle red
        selectedCircle.setOptions({
          fillColor: 'red'
        })
      }
    }

    return () => {
      // Revert selected circle color
      if (selectedRecord && selectedCircle) {
        selectedCircle.setOptions({
          fillColor: getBuildingTypeColours(selectedRecord.buildingType)
        })
      }
    }

  }, [selectedRecord])

  // Triggers: Select a circle from map, or select an item from the right panel
  // Scrolls to the corresponding record in the right panel
  const scrollToRecord = function(recordId: string) {
    const recordListItem = document.getElementById(`record-${recordId}`)
    if (recordListItem) {
      const rezoningRightPanel = document.getElementById('rezoning-right-panel-list')!

      const listItemRect = recordListItem.getBoundingClientRect()
      const panelRect = rezoningRightPanel.getBoundingClientRect()

      // Calculate the position to scroll to, relative to the container
      const scrollToPosition = rezoningRightPanel.scrollTop + listItemRect.top - panelRect.top - 20

      rezoningRightPanel.scrollTo({
        top: scrollToPosition,
        behavior: 'smooth'
      })
    }
  }

  const selectRecord = async function(listRecord: IListRecord) {
    if (selectedRecord && selectedRecord.id === listRecord.id) {
      return
    }
    await setSelectedRecord(listRecord)
    scrollToRecord(listRecord.id)
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
            <h5 className='mb-3'>{capitalizeFirstLetter(type)}s (<a href='/rezonings/table'>go to table view</a>) {!listRecords && <span className='text-muted'>(loading...)</span>}</h5>
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
                <h5>{sortedListRecords.length} {type}s found</h5>
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
                  id={`record-${listRecord.id}`}
                  className='rezoning-list-item border border-light'
                  style={{cursor: 'pointer'}}
                  onClick={() => selectRecord(listRecord)}>
                  <div>
                    <RezoningPanelRow
                      listRecord={listRecord}
                      expanded={selectedRecord && selectedRecord.address === listRecord.address}
                      onFullDetailsClick={(fullRecord) => setSelectedModalFullRecord(fullRecord)}
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

function capitalizeFirstLetter(stringValue: string) {
  return stringValue.charAt(0).toUpperCase() + stringValue.slice(1)
}
