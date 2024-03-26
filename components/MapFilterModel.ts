import moment from 'moment'
import { action, makeObservable, observable } from 'mobx'
import { IListRecord, ZoningStatus, ZoningType } from '@/services/Models'

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

export function filterRecords(listRecords: IListRecord[] | null, filter: IMapFilter) {

  if (!listRecords) {
    return null
  }

  let orderedListRecords = listRecords

  if (filter.sortBy === 'last update') {
    orderedListRecords = orderedListRecords.sort((a, b) => {

      const aMaxDate = a.lastUpdateDate
      const bMaxDate = b.lastUpdateDate

      // If dates are the same, use a secondary criterion for sorting
      if (moment(aMaxDate).isSame(bMaxDate)) {
        return a.id.localeCompare(b.id)
      } else {
        return moment(aMaxDate).isBefore(bMaxDate) ? 1 : -1
      }

    })
  }

  return orderedListRecords

}
