import moment from 'moment'
import { APIService } from '@/services/APIService'
import { ICity, IRezoningDetail } from '@/services/Models'
import { Popover, Skeleton } from 'antd'
import React, { useEffect, useState } from 'react'
import MonthlyStatTable from './_monthlyStatTable'
import RezoningStatusBadge from './_rezoningStatusBadge'

interface IProps {

}

export default function RezoningsPage(props: IProps) {

  const [city, setCity] = useState<ICity | null>(null)
  const [rezonings, setRezonings] = useState<IRezoningDetail[] | null>(null)

  useEffect(() => {

    async function getRezonings() {
      const rezonings = await APIService.getRezonings()
      setRezonings(rezonings.data)
    }

    getRezonings()

  }, [])

  // Summarize total rezonings into monthly metrics - date format MMM YYYY
  let monthlyRezoningMetrics: {date: string, applicationCount: number, approvalCount: number}[] = []

  if (rezonings) {
    rezonings.forEach(rezoning => {

      const appliedDate = rezoning.dates.appliedDate ?
        moment(new Date(rezoning.dates.appliedDate!)).format('MMM YYYY') :
        null
      const approvedDate = rezoning.dates.approvalDate ? 
        moment(new Date(rezoning.dates.approvalDate!)).format('MMM YYYY') :
        null

      // Increment appropriate counts in monthlyRezoningMetrics
      if (appliedDate) {
        const existingAppliedDate = monthlyRezoningMetrics.find(m => m.date === appliedDate)
        if (existingAppliedDate) {
          existingAppliedDate.applicationCount++
        } else {
          monthlyRezoningMetrics.push({
            date: appliedDate,
            applicationCount: 1,
            approvalCount: 0
          })
        }
      }

      if (approvedDate) {
        const existingApprovedDate = monthlyRezoningMetrics.find(m => m.date === approvedDate)
        if (existingApprovedDate) {
          existingApprovedDate.approvalCount++
        } else {
          monthlyRezoningMetrics.push({
            date: approvedDate,
            applicationCount: 0,
            approvalCount: 1
          })
        }
      }
    })

    // Sort by date using moment
    monthlyRezoningMetrics = monthlyRezoningMetrics.sort((a, b) => {
      const aDate = moment(a.date, 'MMM YYYY')
      const bDate = moment(b.date, 'MMM YYYY')
      return aDate.isBefore(bDate) ? 1 : -1
    })
  }

  return (
    <div className='container my-4'>

      <br />

      <h1>PREMIUM: REZONING DATA</h1>

      <br />
      <hr />
      <br />

      <div className='row'>
        <div className='col-md-3'>
          <MonthlyStatTable
            year={moment().subtract(3, 'years').format('YYYY')}
            monthlyRezoningMetrics={monthlyRezoningMetrics}
          />
        </div>
        <div className='col-md-3'>
          <MonthlyStatTable
            year={moment().subtract(2, 'years').format('YYYY')}
            monthlyRezoningMetrics={monthlyRezoningMetrics}
          />
        </div>
        <div className='col-md-3'>
          <MonthlyStatTable
            year={moment().subtract(1, 'year').format('YYYY')}
            monthlyRezoningMetrics={monthlyRezoningMetrics}
          />
        </div>
        <div className='col-md-3'>
          <MonthlyStatTable
            year={moment().format('YYYY')}
            monthlyRezoningMetrics={monthlyRezoningMetrics}
          />
        </div>
      </div>

      <br /><br />

      {
        !rezonings && (
          <Skeleton />
        )
      }

      {
        !!rezonings && (
          <div className='table-responsive'>
            <table className='table table-sm table-striped'>
              <thead className='thead thead-light'>
                <tr>
                  <th>Address</th>
                  <th>Type</th>
                  <th>Description</th>
                  <th>Stats</th>
                  <th>Resources</th>
                  <th>Applied</th>
                  <th>Approved</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody className='tbody'>
                {
                  rezonings.map((rezoning, index) => (
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
                        {/* {
                          !!rezoning.stats.height &&
                            <div className='text-muted'><b>Height: </b>
                              {rezoning.stats.height}
                            </div>
                        } */}
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
