import moment from 'moment'
import React, { useEffect, useState, useRef } from 'react'
import MonthlyStatTable from './_monthlyStatTable'
import RezoningTable from './_rezoningTable'
import RezoningPanelRow from './_rezoningPanelRow'
import { APIService } from '@/services/APIService'
import { IFullRezoningDetail } from '@/services/Models'
import { Skeleton, Modal } from 'antd'
import { getRezoningUtilities } from '@/services/RezoningUtilities'
import { calculateCircleRadius, defaultGoogleMapOptions, getZoningTypeColours } from '@/services/MapUtilities'
import FullRezoningContents from './_fullRezoningContents'
import { MapFilterModel, IMapFilter, filterRezonings } from '@/components/MapFilterModel'
import RezoningMapFilter from './_rezoningMapFilter'

const mapFilter = new MapFilterModel()

export default function Rezonings() {

  const [filter, setFilter] = useState<IMapFilter>(mapFilter.getFilter())
  const [rezonings, setRezonings] = useState<IFullRezoningDetail[] | null>(null)
  const [selectedRezoning, setSelectedRezoning] = useState<IFullRezoningDetail | null>(null)

  // Used for full details modal
  const [selectedFullRezoning, setSelectedFullRezoning] = useState<IFullRezoningDetail | null>(null)
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [circles, setCircles] = useState<google.maps.Circle[] | null>(null)

  // Refs
  const mapRef = useRef<HTMLDivElement>(null)
  const circlesRef = useRef(circles)

  useEffect(() => {
    async function getRezonings() {
      const rezonings = await APIService.getRezonings()
      setRezonings(rezonings.data)
    }
    getRezonings()
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
      
      // Add zoom listener
      google.maps.event.addListener(initializedMap, 'zoom_changed', () => {
        const currentZoom = initializedMap.getZoom()
        circlesRef?.current?.forEach(circle => {
          circle.setRadius(calculateCircleRadius(currentZoom))
        })
      })

      setMap(initializedMap)
    }

    // Cleanup function
    return () => {
      circles?.forEach(circle => circle.setMap(null))
    }
  }, [mapRef, map, defaultGoogleMapOptions])

  // Google Maps - Handle rezonings and circle updates
  useEffect(() => {
    if (map && rezonings) {
      // Clear existing circles
      circles?.forEach(circle => circle.setMap(null))

      const rezoningsWithCoordinates = rezonings
        .filter(rezoning => rezoning.location.latitude && rezoning.location.longitude)
        .filter(rezoning => !!rezoning.type)

      const filteredRezonings = filterRezonings(rezoningsWithCoordinates, filter)

      const newCircles = filteredRezonings.map(rezoning => {
        const newCircle = new google.maps.Circle({
          strokeColor: 'black',
          strokeOpacity: 0.0,
          strokeWeight: 0.5,
          fillColor: getZoningTypeColours(rezoning.type),
          fillOpacity: 0.8,
          map: map,
          center: { lat: rezoning.location.latitude!, lng: rezoning.location.longitude! },
          radius: calculateCircleRadius(map.getZoom())
        })
        google.maps.event.addListener(newCircle, 'click', () => {
          setSelectedRezoning(rezoning)
        })
        return newCircle
      })

      setCircles(newCircles)
    }
  }, [map, rezonings, filter])

  // If a rezoning is selected, scroll to it on the right panel and show a bubble above the circle
  useEffect(() => {

    console.log(`${selectedRezoning?.id}: ${selectedRezoning?.address}`)

    let selectedCircle: google.maps.Circle | null = null

    if (selectedRezoning && circlesRef.current) {
      selectedCircle = circlesRef.current.find(circle => {
        const lat = circle.getCenter()?.lat()
        const lng = circle.getCenter()?.lng()
        return lat === selectedRezoning.location.latitude && lng === selectedRezoning.location.longitude
      }) || null
    }

    if (selectedRezoning && circlesRef.current) {
      const selectedCircle = circlesRef.current.find(circle => {
        const lat = circle.getCenter()?.lat()
        const lng = circle.getCenter()?.lng()
        return lat === selectedRezoning.location.latitude && lng === selectedRezoning.location.longitude
      })

      if (selectedRezoning && selectedCircle) {
        // Find the matching rezoning list item in the right panel
        let selectedRezoningListItem: HTMLElement | null = null
        const rezoningListItems = document.getElementsByClassName('rezoning-list-item')
        for (let i = 0; i < rezoningListItems.length; i++) {
          const div = rezoningListItems[i] as HTMLElement
          if (div.innerText.includes(selectedRezoning.address)) {
            selectedRezoningListItem = div
            break
          }
        }

        // Scroll to the selected rezoning list item
        if (selectedRezoningListItem) {
          const rezoningRightPanel = document.getElementById('rezoning-right-panel-list')!
          rezoningRightPanel.scrollTo({
            top: selectedRezoningListItem.offsetTop - 20,
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
      if (selectedRezoning && selectedCircle) {
        selectedCircle.setOptions({
          fillColor: getZoningTypeColours(selectedRezoning.type)
        })
      }
    }

  }, [selectedRezoning])

  const sortedRezonings: IFullRezoningDetail[] | null = filterRezonings(rezonings, filter)

  return (
    <div>

      {/** Full details modal */}
      <Modal
        open={!!selectedFullRezoning}
        onCancel={() => setSelectedFullRezoning(null)}
        title={
          <>
            <span>{selectedFullRezoning?.address} </span>
            <a
              className='text-muted text-decoration-underline'
              href={`https://www.google.com/maps/search/?api=1&query=${selectedFullRezoning?.address}, ${selectedFullRezoning?.city}}`}
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
          !!selectedFullRezoning && <FullRezoningContents rezoning={selectedFullRezoning} />
        }
      </Modal>

      <div className='d-none d-sm-block' style={{position: 'relative', width: '100%', height: '85vh'}}>

        {/** Google Map div/ref */}
        <div ref={mapRef} style={{ width: '100%', height: '100%' }} />

        {/** Title and filters */}
        <div id='rezoning-map-container'>
          <h5 className='mb-3'>Gridview Premium</h5>
          <RezoningMapFilter mapFilterModel={mapFilter} onApply={(newFilter) => setFilter(newFilter)} />
        </div>

        {/** Rezonings right-hand panel header */}
        <div id='rezoning-right-panel-header'>
          {
            !!sortedRezonings && (
              <>
                <h5>{sortedRezonings.length} rezonings found</h5>
                <div className='text-muted'>
                  <div>
                    {sortedRezonings.filter((r) => r.status === 'approved').length} approved
                  </div>
                  {sortedRezonings.length > 0 && sortedRezonings[0].urls.length > 0 && (
                    <span>Data from {moment.min(sortedRezonings.map(rezoning => moment(rezoning.urls[0].date))).format('MMM DD, YYYY')} to {moment.max(sortedRezonings.map(rezoning => moment(rezoning.urls[0].date))).format('MMM DD, YYYY')}</span>
                  )}
                </div>
              </>
            )
          }
        </div>

        {/** Rezonings right-hand panel list */}
        <div id='rezoning-right-panel-list'>
          {
            !!sortedRezonings && (
              sortedRezonings.map((rezoning) => (
                <div
                  key={rezoning.id}
                  // .rezoning-list-item is used in a useEffect to scroll to the selected rezoning
                  className='rezoning-list-item border border-light'
                  style={{cursor: 'pointer'}}
                  onClick={() => setSelectedRezoning(rezoning)}>
                  <div>
                    <RezoningPanelRow
                      rezoning={rezoning}
                      expanded={selectedRezoning && selectedRezoning.address === rezoning.address}
                      onFullDetailsClick={() => setSelectedFullRezoning(rezoning)}
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

        {
          !!sortedRezonings ? (
            <div className='row table-responsive'>
              <div className='col-md-3'>
                <MonthlyStatTable
                  monthlyRezoningMetrics={
                    getRezoningUtilities(moment().subtract(3, 'years').format('YYYY'), sortedRezonings)
                  }
                />
              </div>
              <div className='col-md-3'>
                <MonthlyStatTable
                  monthlyRezoningMetrics={
                    getRezoningUtilities(moment().subtract(2, 'years').format('YYYY'), sortedRezonings)
                  }
                />
              </div>
              <div className='col-md-3'>
                <MonthlyStatTable
                  monthlyRezoningMetrics={
                    getRezoningUtilities(moment().subtract(1, 'years').format('YYYY'), sortedRezonings)
                  }
                />
              </div>
              <div className='col-md-3'>
                <MonthlyStatTable
                  monthlyRezoningMetrics={
                    getRezoningUtilities(moment().format('YYYY'), sortedRezonings)
                  }
                />
              </div>
            </div>
          ) : (
            <Skeleton />
          )
        }

        {
          !sortedRezonings && (
            <Skeleton />
          )
        }

        {
          !!sortedRezonings && (
            <RezoningTable sortedRezonings={sortedRezonings} />
          )
        }

        <div style={{ height: 100 }}></div>

      </div>

    </div>
  )

}
