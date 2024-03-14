import moment from 'moment'
import { action, makeObservable, observable } from 'mobx'
import { IFullRecordDetail, ZoningStatus, ZoningType } from '@/services/Models'

export interface IMapFilter {
  cities: string[] | null
  applicationYears: string [] | null
  approvalYears: string[] | null
  buildingTypes: ZoningType[] | null
  rezoningStatuses: ZoningStatus[] | null
  sortBy: string | null
}

export class MapFilterModel implements IMapFilter {

  @observable cities: string[] | null = null
  @observable applicationYears: string[] | null = null
  @observable approvalYears: string[] | null = null
  @observable buildingTypes: ZoningType[] | null = [
    'single-family residential',
    'townhouse',
    'multi-family residential',
    'commercial',
    'mixed use',
    'industrial'
  ]
  @observable rezoningStatuses: ZoningStatus[] | null = ['applied', 'public hearing', 'approved']
  @observable sortBy: string | null = 'last update'
  @observable order: 'asc' | 'desc' = 'desc'

  constructor() {
    makeObservable(this)
  }

  @action
  setCities(cities: string[] | null) {
    if (cities && cities.length === 0) {
      this.cities = null
    } else {
      this.cities = cities
    }
  }

  @action
  setApplicationYears(applicationYears: string[] | null) {
    if (applicationYears && applicationYears.length === 0) {
      this.applicationYears = null
    } else {
      this.applicationYears = applicationYears
    }
  }

  @action
  setApprovalYears(approvalYears: string[] | null) {
    if (approvalYears && approvalYears.length === 0) {
      this.approvalYears = null
    } else {
      this.approvalYears = approvalYears
    }
  }

  @action
  setBuildingTypes(buildingTypes: ZoningType[] | null) {
    if (buildingTypes && buildingTypes.length === 0) {
      this.buildingTypes = null
    } else {
      this.buildingTypes = buildingTypes
    }
  }

  @action
  setRezoningStatuses(rezoningStatuses: ZoningStatus[] | null) {
    if (rezoningStatuses && rezoningStatuses.length === 0) {
      this.rezoningStatuses = null
    } else {
      this.rezoningStatuses = rezoningStatuses
    }
  }

  @action
  setSortBy(sortBy: string | null) {
    this.sortBy = sortBy || null
  }

  getFilter(): IMapFilter {
    return {
      cities: this.cities,
      applicationYears: this.applicationYears,
      approvalYears: this.approvalYears,
      buildingTypes: this.buildingTypes,
      rezoningStatuses: this.rezoningStatuses,
      sortBy: this.sortBy
    }
  }

}

export function getLatestDate(rezoning: IFullRecordDetail) {
  const reportUrlDates = rezoning.reportUrls.map((report) => report.date)
  const minutesUrlDates = rezoning.minutesUrls.map((minutes) => minutes.date)
  const combinedDates = [...reportUrlDates, ...minutesUrlDates]
  const latestDate = combinedDates.length > 0 ? combinedDates.reduce((latest, current) => {
    if (!latest) return current
    if (moment(current).isAfter(moment(latest))) return current
    return latest
  }) : '2000-01-01' // If no dates for some reason, set to a very old date
  return latestDate
}

export function filterRezonings(rezonings: IFullRecordDetail[] | null, filter: IMapFilter) {

  if (!rezonings) {
    return null
  }

  let filteredRezonings = rezonings

  if (filter.sortBy === 'last update') {
    filteredRezonings = filteredRezonings.sort((a, b) => {

      const aMaxDate = getLatestDate(a)
      const bMaxDate = getLatestDate(b)

      return moment(aMaxDate).isBefore(bMaxDate) ? 1 : -1
    })
  }

  return filteredRezonings

}
