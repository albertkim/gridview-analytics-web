import { useEffect, useState } from 'react'
import { APIService, INewsResponse } from '../../services/APIService'
import { Skeleton } from 'antd'

export function AdminPage() {

  const [news, setNews] = useState<INewsResponse | null>(null)

  useEffect(() => {
    const getNews = async function() {
      const newsResponse = await APIService.getNews({
        offset: 0,
        limit: 999
      })
      setNews(newsResponse)
    }

    getNews()
  })

  return (
    <div className='container my-4'>

      <h1 className='fw-bold'>ADMIN PAGE</h1>

      <br />
      <div>
        <a href='/admin/create' target='_blank'>+ Add news</a>
      </div>
      <br />

      <hr />

      <div className='table-responsive'>
        <table className='table table-sm table-borderless'>
          <thead className='thead-light'>
            <tr>
              <th>City</th>
              <th>News resources</th>
              <th>Latest date</th>
              <th>Stale</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='text-muted'>Vancouver</td>
              <td>
                <div>
                  <a href='https://covapp.vancouver.ca/councilMeetingPublic/CouncilMeetings.aspx?SearchType=3' target='_blank'>
                    Vancouver city council meeting agenda + minutes
                  </a>
                </div>
                <div>
                  <a href='https://vancouver.ca/news-calendar/all-news-listing.aspx' target='_blank'>
                    Vancouver city news (includes resources)
                  </a>
                </div>
              </td>
            </tr>
            <tr>
              <td className='text-muted'>Richmond</td>
              <td>
                <a href='https://citycouncil.richmond.ca/decisions/search/results.aspx?QB0=AND&QF0=ItemTopic%7cResolutionText%7cFullText%7cSubject&QI0=&QB1=AND&QF1=Date&QI1=&QB4=AND&QF4=Date&QI4=%3e%3d%40DATE-1820&TN=minutes&AC=QBE_QUERY&BU=https%3a%2f%2fcitycouncil.richmond.ca%2fdecisions%2fsearch%2fdefault.aspx&RF=WebBriefDate&' target='_blank'>
                  Richmond city council meeting minutes + resources
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <hr />
      <br />

      {
        !news ?
          <Skeleton />
          :
          <div className='table-responsive'>
            <table className='table table-sm table-borderless'>
              <thead className='thead-light'>
                <th>Date</th>
                <th>City</th>
                <th>News</th>
              </thead>
              <tbody>
                {
                  news.data.map((n) => {
                    return (
                      <tr>
                        <td className='text-muted' style={{marginRight: 10}}>
                          {n.date}
                        </td>
                        <td className='text-muted' style={{marginRight: 10}}>
                          {n.cityName}
                        </td>
                        <td>
                          <a href='#'>{n.title}</a>
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </div>
      }

    </div>
  )

}
