import Axios from 'axios'
import { CityStructure } from './CityStructure'

const apiUrl = process.env.REACT_APP_API_URL!

console.log(`API URL: ${apiUrl}`)

const axios = Axios.create({
  baseURL: apiUrl
})

export interface ICity {
  id?: number
  name: string
  newsVisible: boolean
  stats?: Array<{
    statDate: string
    statName: string
    statValue: number
    sourceUrl: string
  }>
  links?: Array<{
    title: string
    description: string
    url: string
  }>
}

interface INews {
  id: number
  title: string
  summary: string | null
  meetingType: string
  cityId: number
  cityName: string
  date: string
  sentiment: string | null
  links: Array<{
    id: number
    title: string
    summary: string | null
    url: string
  }>
}

export interface INewsResponse {
  offset: number
  limit: number
  total: number
  data: INews[]
}

export const APIService = {

  async getNews({offset, limit, city}: {offset: number, limit: number, city?: string}) {
    const newsResponse = await axios.get(`/api/v1/news`, {
      params: {
        offset: offset,
        limit: limit,
        city: city
      }
    })
    return newsResponse.data as INewsResponse
  },

  async postNews(createNews: any) {
    console.log(createNews)
    const newsResponse = await axios.post(`/api/v1/admin/news`, createNews)
    return newsResponse.data as INews
  },

  async getCities(metroCityName: string | undefined): Promise<Array<ICity>> {
    if (metroCityName) {
      return CityStructure.filter((metro) => metro.name.toLowerCase() === metroCityName.toLowerCase()).map((metro) => metro.cities).flat()
    } else {
      return CityStructure.map((metro) => metro.cities).flat()
    }
  },

  async getCity(cityName: string): Promise<ICity> {
    const cities = CityStructure.map((metro) => metro.cities).flat()
    const matchingCities = cities.find((city) => city.name === cityName)
    if (matchingCities) {
      return matchingCities
    } else {
      throw Error('No city found')
    }
  }

}
