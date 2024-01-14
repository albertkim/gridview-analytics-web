import moment from 'moment'
import { action, makeObservable, observable } from 'mobx'
import { IFullRezoningDetail, ZoningStatus, ZoningType } from '@/services/Models'

export interface IMapFilter {
  cities: string[] | null
  applicationYears: string [] | null
  approvalYears: string[] | null
  rezoningTypes: ZoningType[] | null
  rezoningStatuses: ZoningStatus[] | null
  sortBy: string | null
}

export class MapFilterModel implements IMapFilter {

  @observable cities: string[] | null = null
  @observable applicationYears: string[] | null = null
  @observable approvalYears: string[] | null = null
  @observable rezoningTypes: ZoningType[] | null = null
  @observable rezoningStatuses: ZoningStatus[] | null = null
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
  setRezoningTypes(rezoningTypes: ZoningType[] | null) {
    if (rezoningTypes && rezoningTypes.length === 0) {
      this.rezoningTypes = null
    } else {
      this.rezoningTypes = rezoningTypes
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
      rezoningTypes: this.rezoningTypes,
      rezoningStatuses: this.rezoningStatuses,
      sortBy: this.sortBy
    }
  }

}

export function filterRezonings(rezonings: IFullRezoningDetail[] | null, filter: IMapFilter) {

  if (!rezonings) {
    return []
  }

  let filteredRezonings = rezonings.filter((rezoning) => {

    if (filter.cities && !filter.cities.includes(rezoning.city)) {
      return false
    }

    if (filter.applicationYears && !filter.applicationYears.includes(moment(rezoning.dates.appliedDate).year().toString())) {
      return false
    }

    if (filter.approvalYears && !filter.approvalYears.includes(moment(rezoning.dates.approvalDate).year().toString())) {
      return false
    }

    if (filter.rezoningTypes && (!rezoning.type || !filter.rezoningTypes.includes(rezoning.type))) {
      return false
    }

    if (filter.rezoningStatuses && !filter.rezoningStatuses.includes(rezoning.status)) {
      return false
    }

    return true

  })

  if (filter.sortBy === 'last update') {
    filteredRezonings = filteredRezonings.sort((a, b) => {
      const aDates = a.urls.map(obj => moment(obj.date))
      const bDates = b.urls.map(obj => moment(obj.date))
      const aMaxDate = moment.max(aDates)
      const bMaxDate = moment.max(bDates)
      return aMaxDate.isBefore(bMaxDate) ? 1 : -1
    })
  }

  return filteredRezonings

}
