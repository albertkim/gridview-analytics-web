import moment from 'moment'
import { action, makeObservable, observable, toJS } from 'mobx'
import { IFullRecord, IListRecord, ZoningStatus, BuildingType } from '@/services/Models'

export interface IMapFilter {
  cities: string[] | null
  applicationYears: string [] | null
  approvalYears: string[] | null
  buildingTypes: BuildingType[] | null
  statuses: ZoningStatus[] | null
  sortBy: string | null
}

export class MapFilterModel implements IMapFilter {

  @observable cities: string[] | null = null
  @observable applicationYears: string[] | null = null
  @observable approvalYears: string[] | null = null
  @observable buildingTypes: BuildingType[] | null = [
    'townhouse',
    'multi-family residential',
    'commercial',
    'mixed use',
    'industrial'
  ]
  @observable statuses: ZoningStatus[] | null = ['applied', 'public hearing', 'approved']
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
  setBuildingTypes(buildingTypes: BuildingType[] | null) {
    if (buildingTypes && buildingTypes.length === 0) {
      this.buildingTypes = null
    } else {
      this.buildingTypes = buildingTypes
    }
  }

  @action
  setRezoningStatuses(rezoningStatuses: ZoningStatus[] | null) {
    if (rezoningStatuses && rezoningStatuses.length === 0) {
      this.statuses = null
    } else {
      this.statuses = rezoningStatuses
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
      statuses: this.statuses,
      sortBy: this.sortBy
    }
  }

}

export function filterRecords<T extends IListRecord | IFullRecord>(records: T[] | null, filter: IMapFilter): T[] | null {

  if (!records) {
    return null
  }

  let orderedListRecords = records

  const cities = filter.cities
  if (cities && cities.length > 0) {
    orderedListRecords = orderedListRecords.filter((record) => {
      return cities.includes(record.city)
    })
  }

  const buildingTypes = filter.buildingTypes
  if (buildingTypes && buildingTypes.length > 0) {
    orderedListRecords = orderedListRecords.filter((record) => {
      if (!record.buildingType) {
        return false
      }
      return buildingTypes.includes(record.buildingType)
    })
  }

  const statuses = filter.statuses
  if (statuses && statuses.length > 0) {
    orderedListRecords = orderedListRecords.filter((record) => {
      return statuses.includes(record.status)
    })
  }

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
