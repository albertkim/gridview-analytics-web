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
    return newsResponse.data as INewsResponse
  },

  async postNews(createNews: any) {
    console.log(createNews)
    const newsResponse = await axios.post(`/api/v1/admin/news`, createNews)
    return newsResponse.data as INews
  }

}

export const CityStructure = [

  {
    name: 'Metro Vancouver',
    cities: [
      {
        id: 5,
        name: 'BC (Province)',
        newsVisible: true,
        stats: [],
        links: [
          {
            title: 'Province website',
            description: 'Official website of the Province of British Columbia',
            url: 'https://www2.gov.bc.ca/gov/content/home'
          }
        ]
      },
      {
        id: 1,
        name: 'Vancouver',
        newsVisible: true,
        stats: [
          {
            statDate: '2016',
            statName: 'population',
            statValue: 631486,
            sourceUrl: 'https://www12.statcan.gc.ca/census-recensement/2021/dp-pd/prof/details/page.cfm?Lang=E&SearchText=Vancouver&DGUIDlist=2021A00055915022&GENDERlist=1&STATISTIClist=1&HEADERlist=0'
          },
          {
            statDate: '2021',
            statName: 'population',
            statValue: 662248,
            sourceUrl: 'https://www12.statcan.gc.ca/census-recensement/2021/dp-pd/prof/details/page.cfm?Lang=E&SearchText=Vancouver&DGUIDlist=2021A00055915022&GENDERlist=1&STATISTIClist=1&HEADERlist=0'
          }
        ],
        links: [
          {
            title: 'City website',
            description: 'Offical website of the City of Vancouver',
            url: 'https://vancouver.ca'
          }
        ]
      },
      {
        name: 'Surrey',
        newsVisible: false,
        stats: [
          {
            statDate: '2016',
            statName: 'population',
            statValue: 517887,
            sourceUrl: 'https://www12.statcan.gc.ca/census-recensement/2021/dp-pd/prof/details/page.cfm?Lang=E&SearchText=Surrey&DGUIDlist=2021A00055915004&GENDERlist=1&STATISTIClist=1&HEADERlist=0'
          },
          {
            statDate: '2021',
            statName: 'population',
            statValue: 568322,
            sourceUrl: 'https://www12.statcan.gc.ca/census-recensement/2021/dp-pd/prof/details/page.cfm?Lang=E&SearchText=Surrey&DGUIDlist=2021A00055915004&GENDERlist=1&STATISTIClist=1&HEADERlist=0'
          },
        ],
        links: [

        ]
      },
      {
        id: 2,
        name: 'Richmond',
        newsVisible: true,
        stats: [
          {
            statDate: '2016',
            statName: 'population',
            statValue: 198309,
            sourceUrl: 'https://www12.statcan.gc.ca/census-recensement/2021/dp-pd/prof/details/page.cfm?Lang=E&SearchText=richmond&DGUIDlist=2021A00055915015&GENDERlist=1,2,3&STATISTIClist=1,4&HEADERlist=0'
          },
          {
            statDate: '2021',
            statName: 'population',
            statValue: 209937,
            sourceUrl: 'https://www12.statcan.gc.ca/census-recensement/2021/dp-pd/prof/details/page.cfm?Lang=E&SearchText=richmond&DGUIDlist=2021A00055915015&GENDERlist=1,2,3&STATISTIClist=1,4&HEADERlist=0'
          }
        ],
        links: [

        ]
      },
      {
        id: 3,
        name: 'Burnaby',
        newsVisible: true,
        stats: [
          {
            statDate: '2016',
            statName: 'population',
            statValue: 232755,
            sourceUrl: 'https://www12.statcan.gc.ca/census-recensement/2021/dp-pd/prof/details/page.cfm?Lang=E&SearchText=burnaby&DGUIDlist=2021A00055915025&GENDERlist=1,2,3&STATISTIClist=1,4&HEADERlist=0'
          },
          {
            statDate: '2021',
            statName: 'population',
            statValue: 249125,
            sourceUrl: 'https://www12.statcan.gc.ca/census-recensement/2021/dp-pd/prof/details/page.cfm?Lang=E&SearchText=burnaby&DGUIDlist=2021A00055915025&GENDERlist=1,2,3&STATISTIClist=1,4&HEADERlist=0'
          }
        ],
        links: [

        ]
      },
      {
        id: 4,
        name: 'Coquitlam',
        newsVisible: true,
        stats: [

        ],
        links: [
          
        ]
      },
      {
        name: 'Delta',
        newsVisible: false,
        stats: [

        ],
        links: [
          
        ]
      },
      {
        name: 'North Vancouver',
        newsVisible: false,
        stats: [

        ],
        links: [
          
        ]
      },
      {
        name: 'New Westminster',
        newsVisible: false,
        stats: [

        ],
        links: [
          
        ]
      }
    ]
  },

  {
    name: 'Metro Calgary',
    cities: [
      {
        name: 'Calgary',
        newsVisible: true
      },
      {
        name: 'Airdrie',
        newsVisible: true
      },
      {
        name: 'Cochrane',
        newsVisible: true
      },
      {
        name: 'Okotoks',
        newsVisible: true
      },
      {
        name: 'Chestermere',
        newsVisible: true
      },
      {
        name: 'High RIver',
        newsVisible: true
      },
      {
        name: 'Strathmore',
        newsVisible: true
      }
    ]
  },

  {
    name: 'Metro Toronto',
    cities: [
      {
        name: 'ON (Province)',
        newsVisible: true
      },
      {
        name: 'Toronto',
        newsVisible: true
      },
      {
        name: 'Missisauga',
        newsVisible: true
      },
      {
        name: 'Brampton',
        newsVisible: true
      },
      {
        name: 'Markham',
        newsVisible: true
      },
      {
        name: 'Vaughan',
        newsVisible: true
      },
      {
        name: 'Richmond Hill',
        newsVisible: true
      },
      {
        name: 'Oakville',
        newsVisible: true
      },
      {
        name: 'Burlington',
        newsVisible: true
      },
      {
        name: 'Oshawa',
        newsVisible: true
      }
    ]
  }

]
