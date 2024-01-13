import moment from 'moment'
import React, { useEffect, useState, useRef } from 'react'
import MonthlyStatTable from './_monthlyStatTable'
import RezoningTable from './_rezoningTable'
import RezoningPanelRow from './_rezoningPanelRow'
import { APIService } from '@/services/APIService'
import { ICity, IFullRezoningDetail } from '@/services/Models'
import { Select, Skeleton } from 'antd'
import { getRezoningUtilities } from '@/services/RezoningUtilities'
import { calculateCircleRadius, defaultGoogleMapOptions, getColours } from '@/services/MapUtilities'

interface IProps {

}

export default function Rezonings() {

  // States
  const [city, setCity] = useState<ICity | null>(null)
  const [sort, setSort] = useState<'lastUpdate'>('lastUpdate')
  const [rezonings, setRezonings] = useState<IFullRezoningDetail[] | null>(null)
  const [selectedRezoning, setSelectedRezoning] = useState<IFullRezoningDetail | null>(null)
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

  // Google Maps functions
  // Update the circles ref whenever the circles state changes
  useEffect(() => {
    circlesRef.current = circles
  }, [circles])

  // useEffect for initializing the map and adding the zoom listener
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

  // useEffect for handling rezonings and circle updates
  useEffect(() => {
    if (map && rezonings) {
      // Clear existing circles
      circles?.forEach(circle => circle.setMap(null))

      const rezoningsWithCoordinates = rezonings
        .filter(rezoning => rezoning.location.latitude && rezoning.location.longitude)
        .filter(rezoning => !!rezoning.type)

      const newCircles = rezoningsWithCoordinates.map(rezoning => {
        const newCircle = new google.maps.Circle({
          strokeColor: 'black',
          strokeOpacity: 0.0,
          strokeWeight: 0.5,
          fillColor: getColours(rezoning.type),
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
  }, [map, rezonings])

  // If a rezoning is selected, scroll to it on the right panel and show a bubble above the circle
  useEffect(() => {

    console.log(`Rezoning selected: ${selectedRezoning?.address}`)

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
          const rezoningRightPanel = document.getElementById('map-right-panel')!
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
          fillColor: getColours(selectedRezoning.type)
        })
      }
    }

  }, [selectedRezoning])

  let sortedRezonings: IFullRezoningDetail[] | null = null

  // Sort rezonings based on current sort state
  if (!!rezonings && (sort === 'lastUpdate')) {
    sortedRezonings = rezonings.sort((a, b) => {
      const aDates = a.urls.map(obj => moment(obj.date))
      const bDates = b.urls.map(obj => moment(obj.date))
      const aMaxDate = moment.max(aDates)
      const bMaxDate = moment.max(bDates)
      return aMaxDate.isBefore(bMaxDate) ? 1 : -1
    })
  }

  return (
    <div>

      <div className='d-none d-sm-block' style={{position: 'relative', width: '100%', height: '85vh'}}>

        {/** Google Map div/ref */}
        <div ref={mapRef} style={{ width: '100%', height: '100%' }} />

        {/** Title and filters */}
        <div style={{
          position: 'absolute',
          width: 'calc(100% - 410px)',
          top: 20,
          left: 20,
          height: 100,
          zIndex: 10,
          backgroundColor: 'white',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
          borderRadius: 5,
          padding: 10
        }}>
          <h5 className='mb-3'>Gridview Premium - Rezoning dataset</h5>
          <div>
            <Select
              placeholder='Cities'
              style={{marginRight: 10}}
              onChange={e => setCity(null)}>
              <option value='all'>All cities</option>
            </Select>
            <Select
              placeholder='Rezoning types'
              style={{marginRight: 10}}
              onChange={e => setCity(null)}>
              <option value='all'>All cities</option>
            </Select>
            <Select
              placeholder='Status'
              style={{marginRight: 10}}
              onChange={e => setCity(null)}>
              <option value='all'>All cities</option>
            </Select>
          </div>
        </div>

        {/** Rezonings right-hand header */}

        <div
          style={{
            width: 350,
            minHeight: 100,
            maxHeight: 100,
            overflowY: 'auto',
            position: 'absolute',
            backgroundColor: 'white',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
            scrollbarWidth: 'thin',
            zIndex: 10,
            top: 20,
            right: 20,
            borderRadius: 5,
            padding: 10
          }}>
          {
            !!sortedRezonings && (
              <>
                <h5>{sortedRezonings.length} rezonings found</h5>
                <div className='text-muted'>
                  <div>
                    {sortedRezonings.filter((r) => r.status === 'approved').length} approved
                  </div>
                  {sortedRezonings.length > 0 && (
                    <span>Data from {moment.min(sortedRezonings.map(rezoning => moment(rezoning.urls[0].date))).format('MMM DD, YYYY')} to {moment.max(sortedRezonings.map(rezoning => moment(rezoning.urls[0].date))).format('MMM DD, YYYY')}</span>
                  )}
                </div>
              </>
            )
          }
        </div>

        {/** Rezonings right-hand panel */}
        <div
          id='map-right-panel'
          style={{
            width: 350,
            maxHeight: 'calc(85vh - 40px - 120px)',
            overflowY: 'auto',
            position: 'absolute',
            backgroundColor: 'white',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
            scrollbarWidth: 'thin',
            zIndex: 10,
            bottom: 20,
            right: 20,
            borderRadius: 5
          }}>
          {
            !!sortedRezonings && (
              sortedRezonings.map((rezoning, index) => (
                <div
                  key={index}
                  // .rezoning-list-item is used in a useEffect to scroll to the selected rezoning
                  className='rezoning-list-item border border-light'
                  style={{cursor: 'pointer'}}
                  onClick={() => setSelectedRezoning(rezoning)}>
                  <div className='p-2'>
                    <RezoningPanelRow
                      rezoning={rezoning}
                      expanded={selectedRezoning && selectedRezoning.address === rezoning.address}
                      onFullDetailsClick={() => null}
                    />
                  </div>

                </div>
              ))
            )
          }
        </div>

      </div>

      <br /><br />

      {
        !!sortedRezonings ? (
          <div className='row'>
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
  )

}
