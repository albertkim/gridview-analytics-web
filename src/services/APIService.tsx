import Axios from 'axios'

const apiUrl = process.env.REACT_APP_API_URL!

console.log(`API URL: ${apiUrl}`)

const axios = Axios.create({
  baseURL: apiUrl
})

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

  async getNews({offset, limit, city}: {offset: number, limit: number, city: string}) {
    const newsResponse = await axios.get(`/api/v1/news`, {
      params: {
        offset: offset,
        limit: limit,
        city: city
      }
    })
    return newsResponse.data
  },

  async postNews() {

  }

}
