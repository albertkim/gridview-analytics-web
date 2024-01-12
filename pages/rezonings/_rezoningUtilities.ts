import moment from 'moment'
import { IFullRezoningDetail } from '@/services/Models'

interface IRezoningMetric {
  date: string
  applicationCount: number
  approvalCount: number
}

// Pass in year as YYYY format
export function getRezoningUtilities(year: string, rezonings: IFullRezoningDetail[]): IRezoningMetric[] {

  // Make a metrics entry for every month of the year
  const monthlyRezoningMetrics: {date: string, applicationCount: number, approvalCount: number}[] = []

  for (let i = 0; i < 12; i++) {
    monthlyRezoningMetrics.push({
      date: moment(`${year}-${(i + 1).toString().padStart(2, '0')}-01`).format('MMM YYYY'),
      applicationCount: 0,
      approvalCount: 0
    })
  }

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
      }
    }

    if (approvedDate) {
      const existingApprovedDate = monthlyRezoningMetrics.find(m => m.date === approvedDate)
      if (existingApprovedDate) {
        existingApprovedDate.approvalCount++
      }
    }
  })

  return monthlyRezoningMetrics

}
