import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { APIService, ICity, INewsResponse } from '../../services/APIService'
import { Breadcrumb, Pagination, Skeleton, Tooltip } from 'antd'
import { InfoCircleOutlined } from '@ant-design/icons'
import { CityNewsItem } from './CityNewsItem'

function capitalizeFirstLetter(str: string) {
return str.replace(/\b[a-z]/, (char) => {
  return char.toUpperCase()
})
}

export function CityPage() {

  const pageSize = 10

  const {metroCityShortCode} = useParams<{ metroCityShortCode: string }>()
  const {cityParam} = useParams<{ cityParam: string }>()
  const cityName = cityParam ? cityParam.replace('_', ' ') : null

  const [city, setCity] = useState<ICity | false | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [news, setNews] = useState<INewsResponse | null>(null)

  useEffect(() => {

    const getCities = async function() {
      if (cityName) {
        const matchingCity = await APIService.getCity(cityName)
        if (matchingCity && matchingCity.metroCityShortCode === metroCityShortCode) {
          setCity(matchingCity)
        } else {
          setCity(false)
        }
      }
    }

    getCities()

  }, [cityName, metroCityShortCode])

  useEffect(() => {
    const getNews = async () => {
      if (city) {
        try {
          const offset = (currentPage - 1) * pageSize
          const newsResponse = await APIService.getNews({
            city: city.name,
            offset: offset,
            limit: pageSize
          })
          setNews(newsResponse)
        } catch (error) {
          console.error(error)
        }
      }
    }

    getNews()
  }, [currentPage, city])

  if (city === false) {
    return (
      <div className='container my-4'>
        404
      </div>
    )
  }

  if (!city) {
    return (
      <div className='container my-4'>
        <Skeleton />
      </div>
    )
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  let newsComponent: JSX.Element

  if (!news) {
    newsComponent = (
      <Skeleton />
    )
  } else if (news.data.length === 0) {
    newsComponent = (
      <div className='text-muted'>
        News not available for this city yet. Please contact us to request updates.
      </div>
    )
  } else {
    newsComponent = (
      <>
        {news.data.filter((n) => n.cityName === cityName).map((n) => {
          return (
            <React.Fragment>
              <CityNewsItem
                key={n.id}
                id={n.id}
                title={n.title}
                sentiment={n.sentiment}
                summary={n.summary}
                date={n.date}
                links={n.links} />
              <hr />
            </React.Fragment>
          )
        })}
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          onChange={handlePageChange}
          total={news.total}
        />
      </>
    )
  }

  return (
    <div className='container my-4'>
      <Breadcrumb
        items={[
          {
            title: <a href='/news'>Gridview city news</a>
          },
          {
            title: <a href={`/news/${metroCityShortCode}`}>{city.metroCityName}</a>
          },
          {
            title: <a href={`/news/${metroCityShortCode}/city/${city.name}`}>{city.name}</a>
          }
        ]}/>
      <hr />
      <h1 className='text-center fw-bold mb-4'>
        {city.name.toUpperCase()}
      </h1>
      <hr />
      <br />
      <div className='row'>
        <div className='col-md-4'>

          <div className='border rounded px-3 pt-3 pb-3 bg-light mb-4'>

            {
              city.stats && city.stats.length > 0 && (
                <table className='table table-sm table-borderless'>
                  <thead>
                    <tr>
                      <th className='table-light'>Stat</th>
                      <th className='table-light'>Value</th>
                      <th className='table-light'>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      city.stats && (
                        city.stats.map((stat) => {
                          return (
                            <tr>
                              <td className='table-light text-muted'>
                                {capitalizeFirstLetter(stat.statName)}
                              </td>
                              <td className='table-light text-muted'>
                                {stat.statDisplay}
                              </td>
                              <td className='table-light text-muted'>
                                {
                                  stat.sourceUrl ? (
                                    <a
                                      className='text-muted text-decoration-underline'
                                      href={stat.sourceUrl}
                                      target='_blank'
                                      rel='noreferrer'>
                                      {stat.statDate}
                                    </a>
                                  ) : stat.statDate
                                }
                              </td>
                            </tr>
                          )
                        })
                      )
                    }
                  </tbody>
                </table>
              )
            }
            
            <p><b>Resources</b></p>
            {
              city.links && city.links.length === 0 && (
                <div className='text-muted'>
                  No resources available
                </div>
              )
            }
            {
              city.links && (
                city.links.map((link) => {
                  return (
                    <div>
                      <a
                        className='text-muted text-decoration-underline'
                        href={link.url}
                        target='_blank'
                        rel='noreferrer'
                        style={{marginRight: 8}}>
                        {link.title}
                      </a>
                      {
                        link.description && (
                          <Tooltip title={link.description} placement='right' style={{marginLeft: 4}}>
                            <InfoCircleOutlined />
                          </Tooltip>
                        )
                      }
                    </div>
                  )
                })
              )
            }
          </div>

        </div>
        <div className='col-md-8'>
          {newsComponent}
        </div>
      </div>
      <br />
    </div>
  )

}
