import { useState, useEffect } from 'react'
import { Skeleton, Pagination } from 'antd'
import { APIService } from '@/services/APIService'
import { INewsResponse } from '@/services/Models'
import { ImportantNewsItem } from './ImportantNewsItem'

const pageSize = 5

interface IParameters {
  cityNames: string[],
  news: INewsResponse
}

export function ImportantNewsPanel({cityNames, news: initialNews}: IParameters) {

  const [news, setNews] = useState<INewsResponse | null>(initialNews)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const getNews = async () => {
      try {
        const offset = (currentPage - 1) * pageSize
        const newsResponse = await APIService.getNews({
          important: 0,
          city: cityNames || undefined,
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
    // Scroll to top of the page
    window.scrollTo(0, 0)
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
            <ImportantNewsItem
              key={n.id}
              id={n.id}
              cityName={n.cityName}
              news={n} />
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
        LATEST UPDATES
      </h3>
      {newsComponent}
    </div>
  )

}
