import { useEffect, useState } from 'react'
import { APIService, INewsResponse } from '../../services/APIService'
import { Skeleton, Tag } from 'antd'
import { getAdminCityStructure } from './AdminCityStructure'

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

  const adminCityStructure = getAdminCityStructure(news || undefined)

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
              <th>Days since</th>
            </tr>
          </thead>
          <tbody>
            {
              adminCityStructure.map((city) => {

                let daysSinceComponent: JSX.Element
                if (city.daysSince === null) {
                  daysSinceComponent = <Tag color='red'>No entries</Tag>
                } else if (city.daysSince <= 7) {
                  daysSinceComponent = <Tag color='green'>{city.daysSince} days</Tag>
                } else if (city.daysSince <= 14) {
                  daysSinceComponent = <Tag color='yellow'>{city.daysSince} days</Tag>
                } else {
                  daysSinceComponent = <Tag color='orange'>{city.daysSince} days</Tag>
                }

                return (
                  <tr>
                    <td className='text-muted'>{city.city}</td>
                    <td>
                      {
                        city.resources.map((resource) => {
                          return (
                            <div>
                              <a href={resource.url} target='_blank'>
                                {resource.title}
                              </a>
                            </div>
                          )
                        })
                      }
                    </td>
                    <td className='text-muted'>{city.lastNewsDate || '-'}</td>
                    <td>
                      {daysSinceComponent}
                    </td>
                  </tr>
                )

              })
            }
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
