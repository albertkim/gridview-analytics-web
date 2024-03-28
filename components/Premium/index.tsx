import React, { useEffect, useState, useRef } from 'react'
import { APIService } from '@/services/APIService'
import { IListRecord } from '@/services/Models'
import { message, Alert } from 'antd'
import { calculateCircleRadius, defaultGoogleMapOptions, getBuildingTypeColours } from '@/services/MapUtilities'
import { PremiumContents } from './PremiumContents'

export function Premium() {

  const [listRecords, setListRecords] = useState<IListRecord[] | null>(null)
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [circles, setCircles] = useState<google.maps.Circle[] | null>(null)

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

      const premiumMapOptions = { ...defaultGoogleMapOptions }
      premiumMapOptions.zoom = 11
      premiumMapOptions.center = {
        lat: 49.228509,
        lng: -123.235848
      }

      const initializedMap = new google.maps.Map(mapRef.current, premiumMapOptions)

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

      const newCircles = (recordsWithCoordinates || []).map(rezoning => {
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
        return newCircle
      })

      setCircles(newCircles)
    }
  }, [map, listRecords])

  return (
    <div>


      <div className='d-none d-sm-block' style={{ position: 'relative', width: '100%', height: '90vh' }}>

        {/** Google Map div/ref */}
        <div ref={mapRef} style={{ width: '100%', height: '100%' }} />

        {/** Title, filters, and city metrics (underneath) */}
        <div id='premium-map-container'>

          <div id='premium-top-section'>
            <PremiumContents />
          </div>

        </div>

      </div>

      <br />

      <div className='d-block d-sm-none mb-4'>
        <div className='container-fluid'>

          <div className='row'>
            <div className='col-md-12'>
              <PremiumContents />
            </div>
          </div>

        </div>
      </div>

    </div>
  )

}
