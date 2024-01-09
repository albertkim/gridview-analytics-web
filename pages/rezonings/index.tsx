import moment from 'moment'
import { APIService } from '@/services/APIService'
import { ICity, IRezoningDetail } from '@/services/Models'
import { Skeleton } from 'antd'
import React, { useEffect, useState } from 'react'
import MonthlyStatTable from './_monthlyStatTable'

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

      <h1>REZONING DATA</h1>

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
          <table className='table table-sm table-striped'>
            <thead className='thead thead-light'>
              <tr>
                <th>City</th>
                <th>Address</th>
                <th>Type</th>
                <th>Applied</th>
                <th>Approved</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody className='tbody'>
              {
                rezonings.map((rezoning, index) => (
                  <tr key={index}>
                    <td style={{maxWidth: 80, marginRight: 10}}>{rezoning.city}</td>
                    <td style={{maxWidth: 150, marginRight: 10}}>
                      <a
                        className='text-muted'
                        href={`https://www.google.com/maps/search/?api=1&query=${rezoning.address}, ${rezoning.city}}`}
                        target='_blank'
                        rel='noreferrer'
                        >
                        {rezoning.address}
                      </a>
                    </td>
                    <td style={{maxWidth: 90, marginRight: 10}}>
                      {rezoning.type}
                    </td>
                    <td className='text-muted' style={{maxWidth: 50, marginRight: 10}}>
                      {rezoning.dates.appliedDate}
                    </td>
                    <td className='text-muted' style={{maxWidth: 50, marginRight: 10}}>
                      {rezoning.dates.approvalDate}
                    </td>
                    <td>{rezoning.status}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        )
      }

      <div style={{height: 100}}></div>

    </div>
  )

}
