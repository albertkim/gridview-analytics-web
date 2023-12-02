import { useState, useEffect } from "react"
import { NewsItem } from "./NewsItem"
import { APIService, INewsResponse } from "../../services/APIService"
import { Skeleton, Pagination } from "antd"

interface IParameters {
  city: string
}

export function CityNewsPanel({city}: IParameters) {

  const pageSize = 5
  const [news, setNews] = useState<INewsResponse | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const getNews = async () => {
      try {
        const offset = (currentPage - 1) * pageSize
        const newsResponse = await APIService.getNews({
          city: city,
          offset: offset,
          limit: pageSize
        })
        setNews(newsResponse)
      } catch (error) {
        console.error(error)
      }
    }
    getNews()
  }, [currentPage, city])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  };

  return (
    <div className='border rounded p-4' style={{minHeight: 1000}}>
      <h3 className='mb-4'>{city.toUpperCase()}</h3>
      {
        news ?
          <>
            {news.data.filter((n) => n.cityName === city).map((n) => {
              return (
                <NewsItem
                  key={n.id}
                  title={n.title}
                  sentiment={n.sentiment}
                  contents={n.summary}
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
          :
          <Skeleton />
      }
    </div>
  )

}
