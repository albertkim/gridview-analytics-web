import Axios from 'axios'
import qs from 'qs'
import { INews, INewsResponse, ICity, IRezoningResponse } from './Models'
import { CityStructure } from './CityStructure'

const apiUrl = process.env.NEXT_PUBLIC_API_URL!
console.log(`API URL: ${apiUrl}`)

// AWS Lambda does not accet "[]" as a query string parameter. Axios includes [] by default, so we need to override it
const customParamsSerializer = (params: Object) => qs.stringify(params, { arrayFormat: 'repeat' })

const axios = Axios.create({
  baseURL: apiUrl,
  paramsSerializer: customParamsSerializer
})

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
    console.log(newsResponse.config.url)
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

    const cities: ICity[] = []

    CityStructure.forEach((metro) => {
      metro.cities.forEach((city) => {
        cities.push({
          ...city,
          metroCityName: metro.name,
          metroCityShortCode: metro.shortCode
        })
      })
    })

    // Have the cities with visible news first, non-visible news later
    cities.sort((a, b) => {
      if (a.newsVisible === b.newsVisible) {
        return 0
      } else {
        return a.newsVisible ? -1 : 1
      }
    })

    if (metroCityName) {
      return cities.filter((city) => city.metroCityName.toLowerCase() === metroCityName.toLowerCase())
    } else {
      return cities
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
  },

  async getRezonings(): Promise<IRezoningResponse> {
    const rezoningResponse = await axios.get(`/api/v1/rezonings`)
    return rezoningResponse.data
  }

}