import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { APIService, ICity, INews } from '../../services/APIService'
import { Skeleton, Breadcrumb } from 'antd'
import { LinkItem } from '../MetroNewsPage/Components/LinkItem'

export function NewsPage() {

  const [news, setNews] = useState<INews | false |undefined>()
  const [city, setCity] = useState<ICity | false |undefined>()
  const {newsId: newsIdParam} = useParams<{ newsId: string }>()

  useEffect(() => {

    const getNews = async function() {
      if (newsIdParam) {
        try {
          const newsId = parseInt(newsIdParam)
          const newsResponse = await APIService.getNewsById(newsId)
          setNews(newsResponse)
          const cityResponse = await APIService.getCity(newsResponse.cityName)
          setCity(cityResponse)
        } catch (error) {
          setNews(false)
        }
      }
    }

    getNews()

  }, [newsIdParam])

  if (!newsIdParam || (news === false)) {
    return (
      <div className='container my-4'>
        404
      </div>
    )
  }

  if (!news) {
    return (
      <div className='container my-4'>
        <Skeleton />
      </div>
    )
  }

  return (
    <div className='container my-4' style={{ maxWidth: 600 }}>

      {
        (city && news) && (
          <Breadcrumb
            items={[
              {
                title: <a href='/news'>Gridview city news</a>
              },
              {
                title: <a href={`/news/${city.metroCityShortCode}`}>{city.metroCityName}</a>
              },
              {
                title: <a href={`/news/${city.metroCityShortCode}/city/${city.name}`}>{city.name}</a>
              },
              {
                title: <a href='#'>This article</a>
              }
            ]}
          />
        )
      }


      <hr />
      <br />

      <h1 className='fw-bold'>{news.title}</h1>
      <div className='text-muted'>{news.meetingType || ''}</div>
      <div className='text-muted'>Date: {news.date || 'No date'}</div>
      {
        news.sentiment && <div className='text-muted'>Sentiment: {news.sentiment}</div>
      }

      <br />
      <hr />
      <br />

      {
        news.summary && (
          <div
            className='ql-editor text-muted mt-2 mb-2'
            dangerouslySetInnerHTML={{__html: (news.summary || '')}} />
        )
      }
      {
        news.links && news.links.length > 0 ? (
          <>
            {
              news.links.map((l) => <LinkItem key={l.id} title={l.title} url={l.url} summary={l.summary} />)
            }
          </>
        ) : undefined
      }

      <br />
      <br />
      <hr />

      <div style={{height: 400}} />

    </div>
  )

}
