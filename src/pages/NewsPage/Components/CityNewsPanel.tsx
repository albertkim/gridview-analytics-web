import { useState, useEffect } from 'react'
import { NewsItem } from './NewsItem'
import { APIService, INewsResponse } from '../../../services/APIService'
import { Skeleton, Pagination } from 'antd'

interface IParameters {
  metroCityShortCode: string
  cityName: string
  newsVisible: boolean
}

export function CityNewsPanel({metroCityShortCode, cityName, newsVisible}: IParameters) {

  const pageSize = 5

  const [news, setNews] = useState<INewsResponse | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const getNews = async () => {
      try {
        const offset = (currentPage - 1) * pageSize
        const newsResponse = await APIService.getNews({
          city: cityName,
          offset: offset,
          limit: pageSize
        })
        setNews(newsResponse)
      } catch (error) {
        console.error(error)
      }
    }
    if (newsVisible) {
      getNews()
    }
  }, [currentPage, cityName, newsVisible])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  let newsComponent: JSX.Element

  if (!newsVisible) {
    newsComponent = (
      <div className='text-muted'>
        <div>News not yet available.</div>
        <div>Please contact us to request updates.</div>
      </div>
    )
  } else if (!news) {
    newsComponent = (
      <Skeleton />
    )
  } else {
    newsComponent = (
      <>
        {news.data.filter((n) => n.cityName === cityName).map((n) => {
          return (
            <NewsItem
              key={n.id}
              title={n.title}
              sentiment={n.sentiment}
              summary={n.summary}
              date={n.date}
              links={n.links} />
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
    <div className='border rounded p-4' style={{minHeight: 200}}>
      <h3 className='mb-4'>
        <a className='text-dark' href={`/news/${metroCityShortCode}/city/${cityName}`}>
          {cityName.toUpperCase()}
        </a>
      </h3>
      {newsComponent}
    </div>
  )

}
