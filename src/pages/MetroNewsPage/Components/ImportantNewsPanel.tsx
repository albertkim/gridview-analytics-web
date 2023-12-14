import { useState, useEffect } from 'react'
import { APIService, INewsResponse } from '../../../services/APIService'
import { Skeleton, Pagination } from 'antd'
import { CityNewsItem } from '../../CityPage/CityNewsItem'

interface IParameters {
  cityNames: string[]
}

export function ImportantNewsPanel({cityNames}: IParameters) {

  const pageSize = 10

  const [news, setNews] = useState<INewsResponse | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const getNews = async () => {
      try {
        const offset = (currentPage - 1) * pageSize
        const newsResponse = await APIService.getNews({
          important: 1,
          city: cityNames,
          offset: offset,
          limit: pageSize
        })
        setNews(newsResponse)
      } catch (error) {
        console.error(error)
      }
    }
    getNews()
  }, [currentPage, cityNames])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  let newsComponent: JSX.Element

  if (!news) {
    newsComponent = (
      <Skeleton />
    )
  } else {
    newsComponent = (
      <>
        {news.data.map((n) => {
          return (
            <CityNewsItem
              key={n.id}
              id={n.id}
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
    <div className='border rounded p-2' style={{minHeight: 200}}>
      <h3 className='my-2 p-2'>
        KEY UPDATES
      </h3>
      {newsComponent}
    </div>
  )

}
