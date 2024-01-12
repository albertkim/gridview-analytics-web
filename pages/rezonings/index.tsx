import moment from 'moment'
import React, { useEffect, useState } from 'react'
import MonthlyStatTable from './_monthlyStatTable'
import RezoningStatusBadge from './_rezoningStatusBadge'
import { APIService } from '@/services/APIService'
import { ICity, IFullRezoningDetail } from '@/services/Models'
import { Popover, Skeleton } from 'antd'
import { GoogleMap, CircleF, useJsApiLoader } from '@react-google-maps/api'
import { getRezoningUtilities } from '@/services/RezoningUtilities'

interface IProps {

}

export default function Rezonings() {

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!
  })

  const [city, setCity] = useState<ICity | null>(null)
  const [sort, setSort] = useState<'lastUpdate'>('lastUpdate')
  const [rezonings, setRezonings] = useState<IFullRezoningDetail[] | null>(null)
  const [map, setMap] = useState<google.maps.Map | null>(null)

  useEffect(() => {

    async function getRezonings() {
      const rezonings = await APIService.getRezonings()
      setRezonings(rezonings.data)
    }

    getRezonings()

  }, [])

  // Google Maps functions
  const onLoad = React.useCallback((map: google.maps.Map) => {
    setMap(map)
  }, [])

  const onUnmount = React.useCallback((map: google.maps.Map) => {
    setMap(null)
  }, [])

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

      {
        isLoaded ? (
          <GoogleMap
            mapContainerStyle={{width: '100%', height: '500px'}}
            center={{lat: 49.2827, lng: -123.1207}}
            zoom={10}
            onLoad={onLoad}
            onUnmount={onUnmount}
          >
            {
              // Render addresses as circles on map with different colors for types
              !!rezonings && rezonings
                .filter((rezonings) => rezonings.location.latitude && rezonings.location.longitude)
                .map((rezoning, index) => (
                  <CircleF
                    key={index}
                    center={{
                      lat: rezoning.location.latitude!,
                      lng: rezoning.location.longitude!
                    }}
                    radius={200}
                    options={{
                      strokeColor: '#ff0000',
                      strokeOpacity: 0.8,
                      strokeWeight: 2,
                      fillColor: '#0000ff',
                      fillOpacity: 0.35,
                      clickable: true,
                      draggable: false,
                      editable: false,
                      visible: true,
                      zIndex: 1
                    }}
                    onClick={() => {
                      if (map) {
                        map.panTo({
                          lat: rezoning.location.latitude!,
                          lng: rezoning.location.longitude!
                        })
                      }
                    }}
                  />
                ))
            }
          </GoogleMap>
        ) : (
          <Skeleton />
        )
      }

      <br /><br/>

      {
        !sortedRezonings && (
          <Skeleton />
        )
      }

      {
        !!sortedRezonings && (
          <div className='table-responsive'>
            <table className='table table-sm table-striped'>
              <thead className='thead thead-light'>
                <tr>
                  <th>Address</th>
                  <th>Type</th>
                  <th>Description</th>
                  <th>Stats</th>
                  <th>Resources</th>
                  <th><a className='text-dark text-decoration-underline'>Last update</a></th>
                  <th>Applied</th>
                  <th>Approved</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody className='tbody'>
                {
                  sortedRezonings.map((rezoning, index) => (
                    <tr key={index}>
                      <td style={{maxWidth: 150, marginRight: 10}}>
                        <div>
                          <b className='text-muted'>{rezoning.city}</b>
                        </div>
                        <a
                          className='text-muted text-decoration-underline'
                          href={`https://www.google.com/maps/search/?api=1&query=${rezoning.address}, ${rezoning.city}}`}
                          target='_blank'
                          rel='noreferrer'
                          >
                          <div>{rezoning.address}</div>
                        </a>
                      </td>
                      <td style={{maxWidth: 90, marginRight: 10}}>
                        {rezoning.type}
                      </td>
                      <td className='text-muted' style={{maxWidth: 200, marginRight: 10}}>
                        {truncateString(rezoning.description, 150)}
                      </td>
                      <td style={{maxWidth: 100, marginRight: 10}}>
                        {
                          !!rezoning.stats.buildings &&
                            <div className='text-muted'><b>Buildings: </b>
                              {rezoning.stats.buildings}
                            </div>
                        }
                        {
                          !!rezoning.stats.storeys &&
                            <div className='text-muted'><b>Storeys: </b>
                              {rezoning.stats.storeys}
                            </div>
                        }
                        {
                          !!rezoning.stats.stratas &&
                            <div className='text-muted'><b>Stratas: </b>
                              {rezoning.stats.stratas}
                            </div>
                        }
                        {
                          !!rezoning.stats.rentals &&
                            <div className='text-muted'><b>Rentals: </b>
                              {rezoning.stats.rentals}
                            </div>
                        }
                        {
                          !!rezoning.stats.hotels &&
                            <div className='text-muted'><b>Hotels: </b>
                              {rezoning.stats.hotels}
                            </div>
                        }
                        {
                          !!rezoning.stats.fsr &&
                            <div className='text-muted'><b>FSR: </b>
                              {rezoning.stats.fsr}
                            </div>
                        }
                      </td>
                      <td>
                        <div className='mb-1'>
                          {
                            <Popover
                              placement='rightTop'
                              title='Meeting minutes'
                              content={
                                <div>
                                  {
                                    rezoning.minutesUrls.map((url, index) => (
                                      <div key={index}>
                                        <a
                                          href={url.url}
                                          className='text-muted text-decoration-underline'
                                          target='_blank'
                                          rel='noreferrer'
                                          >
                                          {moment(new Date(url.date)).format('MMM YYYY')}
                                        </a>
                                      </div>
                                    ))
                                  }
                                </div>
                              }
                              trigger='click'
                              >
                              <a className='text-muted text-decoration-underline mr-2'>
                                Council minutes
                              </a>
                            </Popover>
                          }
                        </div>
                        <div>
                          {
                            <Popover
                              placement='rightTop'
                              title='Documents'
                              style={{maxWidth: 500}}
                              content={
                                <div>
                                  {
                                    rezoning.urls.map((url, index) => (
                                      <div key={index}>
                                        <a
                                          href={url.url}
                                          className='text-muted text-decoration-underline'
                                          target='_blank'
                                          rel='noreferrer'
                                          >
                                          {url.title} ({moment(new Date(url.date)).format('MMM YYYY')})
                                        </a>
                                      </div>
                                    ))
                                  }
                                </div>
                              }
                              trigger='click'
                              >
                              <a className='text-muted text-decoration-underline'>Documents</a>
                            </Popover>
                          }
                        </div>
                      </td>
                      <td className='text-muted' style={{maxWidth: 50, marginRight: 10}}>
                        {
                          moment.max(rezoning.urls.map(obj => moment(obj.date))).fromNow()
                        }
                      </td>
                      <td className='text-muted' style={{maxWidth: 50, marginRight: 10}}>
                        {rezoning.dates.appliedDate}
                      </td>
                      <td className='text-muted' style={{maxWidth: 50, marginRight: 10}}>
                        {rezoning.dates.approvalDate}
                      </td>
                      <td>
                        <RezoningStatusBadge status={rezoning.status} />
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        )
      }

      <div style={{height: 100}}></div>

    </div>
  )

}

function truncateString(str: string, maxLength: number) {
  if (str.length > maxLength) {
    return str.substring(0, maxLength - 3) + '...'
  } else {
    return str
  }
}
