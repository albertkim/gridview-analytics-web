export interface ICity {
  id?: number
  name: string
  metroCityName: string
  metroCityShortCode: string
  newsVisible: boolean
  stats?: Array<{
    statDate: string
    statName: string
    statValue: number
    statDisplay: string
    sourceUrl: string
  }>
  links?: Array<{
    title: string
    description: string
    url: string
  }>
}

export interface ILink {
  id: number
  title: string
  summary: string | null
  url: string
}

export interface INews {
  id: number
  title: string
  summary: string | null
  meetingType: string
  cityId: number
  cityName: string
  date: string
  createDate: string
  important: number | null
  tags: string[]
  links: ILink[]
}

export interface INewsResponse {
  offset: number
  limit: number
  total: number
  data: INews[]
}

export type BuildingType =
  'single-family residential' |
  'townhouse' |
  'mixed use' |
  'multi-family residential' |
  'industrial' |
  'commercial' |
  'other'

export type ZoningStatus =
  'applied' |
  'pending' |
  'public hearing' |
  'approved' |
  'denied' |
  'withdrawn'

export interface IFullRecord {
  id: string
  city: string
  metroCity: string | null
  applicationId: string | null
  address: string
  applicant: string | null
  behalf: string | null
  description: string
  type: 'rezoning' | 'development permit'
  buildingType: BuildingType | null
  stats: {
    buildings: number | null
    stratas: number | null
    rentals: number | null
    hotels: number | null
    fsr: number | null
    height: number | null
    storeys: number | null
  }
  zoning: {
    previousZoningCode: string | null
    previousZoningDescription: string | null
    newZoningCode: string | null
    newZoningDescription: string | null
  }
  status: ZoningStatus
  dates: {
    appliedDate: string | null
    publicHearingDate: string | null
    approvalDate: string | null
    denialDate: string | null
    withdrawnDate: string | null
  }
  location: {
    latitude: number | null
    longitude: number | null
  },
  reportUrls: {
    title: string
    url: string
    date: string
    status: ZoningStatus
  }[]
  minutesUrls: {
    url: string
    date: string
    status: ZoningStatus
  }[]
  createDate: string
  updateDate: string
  lastUpdateDate: string
}

export interface IListRecord {
  id: string
  address: string
  city: string
  metroCity: string
  location: {
    latitude: number | null
    longitude: number | null
  }
  buildingType: BuildingType | null
  stats: {
    buildings: number | null
    stratas: number | null
    rentals: number | null
    hotels: number | null
    fsr: number | null
    height: number | null
    storeys: number | null
  }
  status: ZoningStatus
  lastUpdateDate: string
}

export interface IRezoningResponse {
  total: number
  data: IFullRecord[]
}

export interface IListRecordResponse {
  total: number
  limit: number
  offset: number
  data: IListRecord[]
}

export interface IRawNews {
  city: string
  metroCity: string | null
  url: string
  date: string
  meetingType: string
  title: string
  resolutionId: string | null
  contents: string
  tags: string[]
  minutesUrl: string | null
  reportUrls: Array<{
    title: string
    url: string
  }>
}

export interface IBuildingTypeAnalytics {
  cityData: IBuildingTypeAnalyticsCityEntry[]
}

export interface IBuildingTypeAnalyticsCityEntry {
  city: {
    cityName: string
  }
  yearData: IBuildingTypeAnalyticsYearEntry[]
}

export interface IBuildingTypeAnalyticsYearEntry {
  year: string // 'YYYY-MM-DD'
  buildingTypeData: {
    [key in BuildingType]: number
  }
}
