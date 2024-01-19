import { INewsResponse } from '@/services/Models'
import moment from 'moment'

interface IAdminCityStructureEntry {
  city: string
  resources: Array<{
    title: string
    url: string
  }>
  lastNewsDate: string | null
  daysSince: number | null
}

const baseAdminCityStructure = [

  {
    city: 'BC (province)',
    resources: [
      {
        title: 'BC News (+ Ministry of Housing + Department of Transportation and Infrastructure)',
        url: 'https://archive.news.gov.bc.ca'
      }
    ]
  },
  {
    city: 'Vancouver',
    resources: [
      {
        title: 'Vancouver city council meeting agenda + minutes',
        url: 'https://covapp.vancouver.ca/councilMeetingPublic/CouncilMeetings.aspx?SearchType=3'
      },
      {
        title: 'Vancouver city news (+ resources)',
        url: 'https://vancouver.ca/news-calendar/all-news-listing.aspx'
      }
    ]
  },
  {
    city: 'Richmond',
    resources: [
      {
        title: 'Richmond city council meeting minutes + resources',
        url: 'https://citycouncil.richmond.ca/decisions/search/results.aspx?QB0=AND&QF0=ItemTopic%7cResolutionText%7cFullText%7cSubject&QI0=&QB1=AND&QF1=Date&QI1=&QB4=AND&QF4=Date&QI4=%3e%3d%40DATE-1820&TN=minutes&AC=QBE_QUERY&BU=https%3a%2f%2fcitycouncil.richmond.ca%2fdecisions%2fsearch%2fdefault.aspx&RF=WebBriefDate&'
      }
    ]
  },
  {
    city: 'Burnaby',
    resources: [
      {
        title: 'Burnaby city council agenda + minutes',
        url: 'https://pub-burnaby.escribemeetings.com/?Year=2023&Expanded=City%20Council%20Meeting'
      },
      {
        title: 'Planning and development committee agenda + minutes',
        url: 'https://pub-burnaby.escribemeetings.com/?Year=2023&Expanded=Planning%20and%20Development%20Committee'
      }
    ]
  },
  {
    city: 'Coquitlam',
    resources: [
      {
        title: 'Coquitlam city council agenda + minutes',
        url: 'https://www.coquitlam.ca/129/Agendas-Minutes'
      }
    ]
  },
  {
    city: 'Delta',
    resources: [
      {
        title: 'Delta council meeting agendas',
        url: 'https://delta.civicweb.net/filepro/documents/215973/'
      },
      {
        title: 'Delta council meeting minutes',
        url: 'https://delta.civicweb.net/filepro/documents/215964/'
      }
    ]
  }

]

export function getAdminCityStructure(news?: INewsResponse): IAdminCityStructureEntry[] {

  return baseAdminCityStructure.map((base) => {

    // News entries are in reverse chronological order, so the first entry is the latest entry
    const latestNews = news ? news.data.find((n => n.cityName === base.city)) : undefined
    const latestDate = latestNews ? latestNews.date : null

    return {
      ...base,
      lastNewsDate: latestDate,
      daysSince: latestDate ? moment().diff(latestDate, 'days') : null
    }
  })

}
