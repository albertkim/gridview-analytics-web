import { useEffect, useState } from 'react'
import { Skeleton, Tag, Typography, message } from 'antd'
import { APIService } from '@/services/APIService'
import { INews, INewsResponse, IRawNews } from '@/services/Models'
import { getAdminCityStructure } from './AdminCityStructure'
import { CreateNewsModal } from './CreateNewsModal'

export function AdminPage() {

  // Data returned from the API and stored on client]
  const [news, setNews] = useState<INewsResponse | null>(null)
  const [rawNews, setRawNews] = useState<IRawNews[] | null>(null)

  // Fields to control the create/edit modal
  const [createNews, setCreateNews] = useState<boolean | null>(null)
  const [editNews, setEditNews] = useState<INews | null>(null)
  const [editRawNews, setEditRawNews] = useState<IRawNews | null>(null)

  // Ant Design message component: https://ant.design/components/message
  const [messageApi, contextHolder] = message.useMessage()

  const getNews = async function() {
    const newsResponse = await APIService.getNews({
      offset: 0,
      limit: 999
    })
    setNews(newsResponse)
  }

  const getRawNews = async function() {
    const rawNewsResponse = await APIService.getRawNews()
    setRawNews(rawNewsResponse)
  }

  useEffect(() => {
    getNews()
    getRawNews()
  }, [])

  const adminCityStructure = getAdminCityStructure(news || undefined)

  const deleteNews = async function (newsId: number) {
    if (window.confirm('Are you sure you want to delete this news item?')) {
      try {
        await APIService.deleteNews(newsId)
        messageApi.success(`Successfully deleted news with ID ${newsId}`)
        getNews()
      } catch (error) {
        messageApi.error(`There was an error deleting news with ID ${newsId}`)
      }
    }
  }

  return (
    <div className='container-fluid my-4'>

      <h1 className='fw-bold'>ADMIN PAGE</h1>

      {/* For Ant Design message component */}
      {contextHolder}

      <br />

      <div className='row'>

        {/** The left half of the screen has the ability to view, add, delete news */}
        <div className='col-md-6'>

          <div>
            <a href='#' onClick={() => setCreateNews(true)}>+ Add news</a>
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
                      <tr key={city.city}>
                        <td className='text-muted'>{city.city}</td>
                        <td>
                          {
                            city.resources.map((resource, index) => {
                              return (
                                <div key={index}>
                                  <a href={resource.url} target='_blank' rel='noreferrer'>
                                    {resource.title}
                                  </a>
                                </div>
                              )
                            })
                          }
                        </td>
                        <td className='text-muted' style={{ minWidth: 100 }}>
                          {city.lastNewsDate || '-'}
                        </td>
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
                    <tr>
                      <th>Date</th>
                      <th>City</th>
                      <th>Meeting type</th>
                      <th>News</th>
                      <th>{/** Empty "important" column **/}</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      news.data.map((n) => {
                        return (
                          <tr key={n.id}>
                            <td className='text-muted' style={{ minWidth: 100, marginRight: 10 }}>
                              {n.date}
                            </td>
                            <td className='text-muted' style={{ marginRight: 10 }}>
                              {n.cityName}
                            </td>
                            <td className='text-muted' style={{ maxWidth: 150, marginRight: 10 }}>
                              {n.meetingType}
                            </td>
                            <td>
                              <a
                                href='#'
                                onClick={(e) => {
                                  e.preventDefault()
                                  setEditNews(n)
                                }}>
                                {
                                  n.tags.map((tag) => <Tag key={tag} color='blue'>{tag}</Tag>)
                                }
                                <div>
                                  {n.title}
                                </div>
                              </a>
                            </td>
                            <td>
                              {
                                n.important && <Tag>{n.important}</Tag>
                              }
                            </td>
                            <td>
                              <a className='text-danger' onClick={() => deleteNews(n.id)}>Delete</a>
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

        {/** The right half of the screen shows raw news and the ability to add news from them */}
        <div className='col-md-6'>

          <div>
            <b>Raw scraped news</b>
          </div>

          <br />

          {
            rawNews ? (
              <>
                {
                  rawNews.map((rawNewsItem, index) => {
                    return (
                      <div className='mb-2' key={index}>
                        <div className='text-muted'>{rawNewsItem.date}</div>
                        <div className='text-muted'><b>{rawNewsItem.city} - {rawNewsItem.meetingType}</b></div>
                        <div>
                          <b><a className='mr-2' onClick={() => setEditRawNews(rawNewsItem)}>{rawNewsItem.title}</a></b>
                          <a href={rawNewsItem.url} target='_blank' rel='noreferrer'>[Link]</a>
                        </div>
                        {
                          rawNewsItem.contents && (
                            <div className='text-muted'>
                              <Typography.Paragraph ellipsis={{rows: 3}}>
                                {rawNewsItem.contents}
                              </Typography.Paragraph>
                            </div>
                          )
                        }
                        {
                          rawNewsItem.reportUrls.length > 0 && (
                            <>
                              {
                                rawNewsItem.reportUrls.map((reportUrl, index) => {
                                  return (
                                    <div key={index}>
                                      <a href={reportUrl.url} target='_blank' rel='noreferrer'>{reportUrl.title}</a>
                                    </div>
                                  )
                                })
                              }
                            </>
                          )
                        }
                      </div>
                    )
                  })
                }
              </>
            ) : (
              <Skeleton />
            )
          }

        </div>

      </div>

      <CreateNewsModal
        isModalOpen={createNews || !!editNews || !!editRawNews}
        editNews={editNews || undefined}
        editRawNews={editRawNews || undefined}
        onSubmit={() => {
          setEditNews(null)
          setEditRawNews(null)
          setCreateNews(null)
          getNews()
        }}
        onClose={() => {
          setEditNews(null)
          setEditRawNews(null)
          setCreateNews(null)
        }} />

    </div>
  )

}
