import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { APIService, ICity, INewsResponse } from '../../services/APIService'
import { Pagination, Skeleton } from 'antd'
import { NewsItem } from '../NewsPage/Components/NewsItem'

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
    <div className='container my-4'>
      <div className='mb-2'>
        <a href={`/news/${metroCityShortCode}`}>{'< Back to '} {city.metroCityName}</a>
      </div>
      <hr />
      <h1 className='text-center fw-bold mb-4'>
        {city.name.toUpperCase()}
      </h1>
      <hr />
      <br />
      {newsComponent}
      <br />
    </div>
  )

}
