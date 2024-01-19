import moment from 'moment'
import { IFullRezoningDetail, ZoningType } from '@/services/Models'

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

  return (
    <div>
      <div><b>{city}</b></div>
      <pre>
        {JSON.stringify(typesWithAvgMinMaxDaysToApproval, null, 2)}
      </pre>
    </div>
  )

}
