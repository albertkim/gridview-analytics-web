import moment from 'moment'
import { IFullRezoningDetail, ZoningType } from '@/services/Models'
import { useState } from 'react'

interface IProps {
  city: string
  rezonings: IFullRezoningDetail[]
}

interface ITypeStatistic {
  type: ZoningType
  avgDaysToApproval: number
  minDaysToApproval: number
  maxDaysToApproval: number
  medDaysToApproval: number
  daysToApprovalArray: number[]
}

export function CityStatistics({ city, rezonings }: IProps) {

  const [expanded, setExpanded] = useState<boolean>(false)

  const rezoningsInCity = rezonings.filter(rezoning => rezoning.city === city)

  const rezoningsWithAppliedAndApprovalDate = rezoningsInCity
    .filter(rezoning =>
      rezoning.type &&
      rezoning.dates.appliedDate &&
      rezoning.dates.approvalDate &&
      moment(rezoning.dates.appliedDate).isBefore(moment(rezoning.dates.approvalDate))
    ).map(rezoning => ({
      type: rezoning.type!,
      appliedDate: rezoning.dates.appliedDate!,
      approvalDate: rezoning.dates.approvalDate!,
      daysToApproval: moment(rezoning.dates.approvalDate).diff(moment(rezoning.dates.appliedDate), 'days')
    }))

  // Group the data by type
  const typesWithAvgMinMaxDaysToApproval: ITypeStatistic[] = []

  rezoningsWithAppliedAndApprovalDate.forEach(rezoning => {
    const typeStatistic = typesWithAvgMinMaxDaysToApproval.find(type => type.type === rezoning.type)

    if (typeStatistic) {
      typeStatistic.daysToApprovalArray.push(rezoning.daysToApproval)
    } else {
      typesWithAvgMinMaxDaysToApproval.push({
        type: rezoning.type,
        avgDaysToApproval: 0,
        medDaysToApproval: 0,
        minDaysToApproval: 0,
        maxDaysToApproval: 0,
        daysToApprovalArray: [rezoning.daysToApproval]
      })
    }
  })

  // Calculate the average, min and max days to approval for each type
  typesWithAvgMinMaxDaysToApproval.forEach(type => {
    type.avgDaysToApproval = type.daysToApprovalArray.reduce((a, b) => a + b) / type.daysToApprovalArray.length
    type.medDaysToApproval = type.daysToApprovalArray.sort((a, b) => a - b)[Math.floor(type.daysToApprovalArray.length / 2)]
    type.minDaysToApproval = Math.min(...type.daysToApprovalArray)
    type.maxDaysToApproval = Math.max(...type.daysToApprovalArray)
  })

  function getStatsByType(type: ZoningType) {
    const matchingType = typesWithAvgMinMaxDaysToApproval.find(t => t.type === type)
    if (matchingType) {
      return matchingType
    } else {
      return null
    }
  }

  if (!expanded) {
    return (
      <div style={{width: 150}}>
        <a className='text-decoration-underline' onClick={() => setExpanded(true)}>{city} metrics</a>
      </div>
    )
  }

  return (
    <div style={{width: 300}}>
      <div className='mb-2'>
        <a className='text-decoration-underline' onClick={() => setExpanded(false)}>Hide</a>
      </div>
      <table className='table table-sm'>
        <thead>
          <tr>
            <th>{city}</th>
            <th style={{textAlign: 'right'}}>
              <div>Median days</div>
              <div>to approval</div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className='text-muted'>Townhouse</td>
            <td style={{textAlign: 'right'}}>{getStatsByType('townhouse') ? getStatsByType('townhouse')?.medDaysToApproval : '-'} days</td>
          </tr>
          <tr>
            <td className='text-muted'>Multi-family residential</td>
            <td style={{textAlign: 'right'}}>{getStatsByType('multi-family residential') ? getStatsByType('multi-family residential')?.medDaysToApproval : '-'} days</td>
          </tr>
          <tr>
            <td className='text-muted'>Mixed-use</td>
            <td style={{textAlign: 'right'}}>{getStatsByType('mixed use') ? getStatsByType('mixed use')?.medDaysToApproval : '-'} days</td>
          </tr>
          <tr>
            <td className='text-muted'>Commercial</td>
            <td style={{textAlign: 'right'}}>{getStatsByType('commercial') ? getStatsByType('commercial')?.medDaysToApproval : '-'} days</td>
          </tr>
          <tr>
            <td className='text-muted'>Industrial</td>
            <td style={{textAlign: 'right'}}>{getStatsByType('industrial') ? getStatsByType('industrial')?.medDaysToApproval : '-'} days</td>
          </tr>
          <tr>
            <td className='text-muted'>Single-family residential</td>
            <td style={{textAlign: 'right'}}>{getStatsByType('single-family residential') ? getStatsByType('single-family residential')?.medDaysToApproval : '-'} days</td>
          </tr>
        </tbody>
      </table>
    </div>
  )

}
