import { useState, useEffect } from 'react'
import { MetroNewsItem } from './MetroNewsItem'
import { APIService, INewsResponse } from '../../../services/APIService'
import { Skeleton } from 'antd'

interface IParameters {
  metroCityShortCode: string
  cityName: string
  newsVisible: boolean
}

export function CityNewsPanel({metroCityShortCode, cityName, newsVisible}: IParameters) {

  const pageSize = 5

  const [news, setNews] = useState<INewsResponse | null>(null)

  useEffect(() => {
    const getNews = async () => {
      try {
        const newsResponse = await APIService.getNews({
          city: cityName,
          offset: 0,
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
  }, [cityName, newsVisible])

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
        {news.data.map((n) => {
          return (
            <MetroNewsItem
              key={n.id}
              id={n.id}
              title={n.title}
              date={n.date} />
          )
        })}
        {
          news.total > pageSize && (
            <div>
              <a href={`/news/${metroCityShortCode}/city/${cityName}`}>Read more</a>
            </div>
          )
        }
      </>
    )
  }

  return (
    <div>
      <div className='fw-bold mb-2'>
        <a className='text-decoration-underline' href={`/news/${metroCityShortCode}/city/${cityName}`}>
          {cityName.toUpperCase()}
        </a>
      </div>
      {newsComponent}
    </div>
  )

}
