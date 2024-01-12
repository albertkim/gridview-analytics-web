import moment from 'moment'
import React, { useEffect, useState, useRef } from 'react'
import MonthlyStatTable from './_monthlyStatTable'
import RezoningTable from './_rezoningTable'
import { APIService } from '@/services/APIService'
import { ICity, IFullRezoningDetail } from '@/services/Models'
import { Skeleton } from 'antd'
import { getRezoningUtilities } from '@/services/RezoningUtilities'
import { calculateCircleRadius, defaultGoogleMapOptions, getColours } from '@/services/MapUtilities'

interface IProps {

}

export default function Rezonings() {

  // States
  const [city, setCity] = useState<ICity | null>(null)
  const [sort, setSort] = useState<'lastUpdate'>('lastUpdate')
  const [rezonings, setRezonings] = useState<IFullRezoningDetail[] | null>(null)
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
        return new google.maps.Circle({
          strokeColor: 'black',
          strokeOpacity: 0.0,
          strokeWeight: 0.5,
          fillColor: getColours(rezoning.type),
          fillOpacity: 0.8,
          map: map,
          center: { lat: rezoning.location.latitude!, lng: rezoning.location.longitude! },
          radius: calculateCircleRadius(map.getZoom())
        })
      })

      setCircles(newCircles)
    }
  }, [map, rezonings])

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
    <div className='container-fluid my-4'>

      <br />

      <div className='container'>
        <div className='text-muted'>Gridview Premium</div>
        <div className='text-muted'>Metro Vancouver early access</div>
        <h1 className='display-4 fw-bold'>REZONING DATA</h1>
      </div>

      <br />
      <hr />
      <br />

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

      <br /><br />

      <div ref={mapRef} style={{ width: '100%', height: '500px' }} />

      <br /><br />

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
