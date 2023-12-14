import { useEffect, useState } from 'react'
import { APIService, INews, INewsResponse } from '../../services/APIService'
import { Skeleton, Tag, message } from 'antd'
import { getAdminCityStructure } from '@/components/admin/AdminCityStructure'
import { CreateNewsModal } from '@/components/admin/CreateNewsModal'

export default function AdminPage() {

  const [news, setNews] = useState<INewsResponse | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editNews, setEditNews] = useState<INews | null>(null)
  const [messageApi, contextHolder] = message.useMessage()

  const getNews = async function() {
    const newsResponse = await APIService.getNews({
      offset: 0,
      limit: 999
    })
    setNews(newsResponse)
  }

  useEffect(() => {
    getNews()
  }, [])

  const adminCityStructure = getAdminCityStructure(news || undefined)

  const deleteNews = async function(newsId: number) {
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
    <div className='container my-4'>

      <h1 className='fw-bold'>ADMIN PAGE</h1>

      {/* For Ant Design message component */}
      {contextHolder}

      <br />
      <div>
        <a href='#' onClick={() => setIsModalOpen(true)}>+ Add news</a>
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
                    <td className='text-muted' style={{minWidth: 100}}>
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
                        <td className='text-muted' style={{minWidth: 100, marginRight: 10}}>
                          {n.date}
                        </td>
                        <td className='text-muted' style={{marginRight: 10}}>
                          {n.cityName}
                        </td>
                        <td className='text-muted' style={{maxWidth: 150, marginRight: 10}}>
                          {n.meetingType}
                        </td>
                        <td>
                          <a
                            href='#'
                            onClick={(e) => {
                              e.preventDefault()
                              setIsModalOpen(true)
                              setEditNews(n)
                            }}>
                            {n.title}
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

      <CreateNewsModal
        isModalOpen={isModalOpen}
        news={editNews || undefined}
        onSubmit={() => {
          setIsModalOpen(false)
          getNews()
        }}
        onClose={() => {
          setIsModalOpen(false)
          setEditNews(null)
        }} />

    </div>
  )

}
