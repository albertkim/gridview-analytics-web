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
  sentiment: string | null
  important: number | null
  links: ILink[]
}

export interface INewsResponse {
  offset: number
  limit: number
  total: number
  data: INews[]
}

export const APIService = {

  async getNewsById(newsId: number) {
    const newsResponse = await axios.get(`/api/v1/news/${newsId}`)
    return newsResponse.data as INews
  },

  async getNews({offset, limit, city, important}: {offset: number, limit: number, city?: string | string[], important?: number}) {
    const newsResponse = await axios.get(`/api/v1/news`, {
      params: {
        offset: offset,
        limit: limit,
        city: city,
        important: important
      }
    })
    return newsResponse.data as INewsResponse
  },

  async postNews(createNews: any) {
    const newsResponse = await axios.post(`/api/v1/admin/news`, createNews)
    return newsResponse.data as INews
  },

  async updateNews(newsId: number, updateNews: any) {
    const newsResponse = await axios.put(`/api/v1/admin/news/${newsId}`, updateNews)
    return newsResponse.data as INews
  },

  async deleteNews(newsId: number) {
    await axios.delete(`/api/v1/admin/news/${newsId}`)
  },

  async getCities(metroCityName: string | undefined): Promise<Array<ICity>> {
    const cityStructure = CityStructure.map((metro) => {
      const citiesWithMetroInfo = metro.cities.map((city) => {
        return {
          ...city,
          metroCityName: metro.name,
          metroCityShortCode: metro.shortCode,
        }
      })
      return citiesWithMetroInfo
    }).flat()

    if (metroCityName) {
      return cityStructure.filter((city) => city.metroCityName.toLowerCase() === metroCityName.toLowerCase())
    } else {
      return cityStructure
    }
  },

  async getCity(cityName: string): Promise<ICity> {
    const cityStructure = CityStructure.map((metro) => {
      const citiesWithMetroInfo = metro.cities.map((city) => {
        return {
          ...city,
          metroCityName: metro.name,
          metroCityShortCode: metro.shortCode,
        }
      })
      return citiesWithMetroInfo
    }).flat()

    const matchingCities = cityStructure.find((city) => city.name === cityName)
    if (matchingCities) {
      return matchingCities
    } else {
      throw Error('No city found')
    }
  }

}
