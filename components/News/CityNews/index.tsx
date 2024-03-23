import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { APIService } from '@/services/APIService'
import { ICity, INewsResponse } from '@/services/Models'
import { Skeleton, Pagination, Tooltip, Breadcrumb } from 'antd'
import { InfoCircleOutlined } from '@ant-design/icons'
import { CityNewsItem } from './CityNewsItem'

function capitalizeFirstLetter(str: string) {
  return str.replace(/\b[a-z]/, (char) => {
    return char.toUpperCase()
  })
}

interface IProps {
  city: ICity | false,
  news: INewsResponse | false
}

export const defaultPageSize = 10

export function CityNews({city, news: initialNews}: IProps) {

  const router = useRouter()
  const cityNameParam = router.query['city-name'] as string
  const metroCityShortCode = router.query['metro-shortcode'] as string

  const [currentPage, setCurrentPage] = useState(1)
  const [news, setNews] = useState<INewsResponse | false | undefined>(initialNews)

  if (city === false || news === false) {
    return (
      <div className='container my-4'>
        404
      </div>
    )
  }

  const handlePageChange = async function(page: number) {
    setCurrentPage(page)
    setNews(undefined)
    const offset = (currentPage - 1) * defaultPageSize
    const news = await APIService.getNews({
      offset: offset,
      limit: defaultPageSize,
      city: cityNameParam
    })
    setNews(news)
    // Scroll to top - in the future, use url params to keep track of page
    window.scrollTo(0, 0)
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
        {news.data.map((n) => {
          return (
            <React.Fragment key={n.id}>
              <CityNewsItem
                key={n.id}
                id={n.id}
                title={n.title}
                summary={n.summary}
                date={n.date}
                links={n.links} />
              <hr />
            </React.Fragment>
          )
        })}
        <Pagination
          current={currentPage}
          pageSize={defaultPageSize}
          onChange={(page) => handlePageChange(page)}
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
                        city.stats.map((stat, index) => {
                          return (
                            <tr key={index}>
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
                city.links.map((link, index) => {
                  return (
                    <div key={index}>
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
