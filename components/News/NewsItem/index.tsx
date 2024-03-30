import { ICity, INews } from '@/services/Models'
import { Breadcrumb, Skeleton, Tag } from 'antd'
import { LinkItem } from '@/components/LinkItem'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import { APIService } from '@/services/APIService'

interface IProps {
  city: ICity,
  news: INews
}

export function NewsItem({city, news}: IProps) {

  const [relatedTagnews, setRelatedTagnews] = useState<INews[] | null>(null)

  const noHTMLNewsSummary = news.summary ? news.summary.replace(/<[^>]*>?/gm, '').slice(0, 160) : ''

  useEffect(() => {
    const getTagNews = async () => {
      const tagNews = await APIService.getNews({offset: 0, limit: 5, tag: news.tags})
      setRelatedTagnews(tagNews.data)
    }
    getTagNews()
  }, [])

  return (
    <div className='container my-4' style={{ maxWidth: 600 }}>

      <Head>
        <title>{news.title}</title>
        <meta name='description' content={news.summary || undefined} />
        <meta property='og:title' content={news.title || undefined} />
        <meta property='og:description' content={noHTMLNewsSummary || undefined} />
      </Head>

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

      <hr />
      <br />

      <div className='text-muted'>{news.cityName || ''}</div>
      <h1 className='fw-bold'>{news.title}</h1>
      <div className='text-muted'>{news.meetingType || ''}</div>
      <div className='text-muted mb-1'>Date: {news.date || 'No date'}</div>
      <div>
        {
          news.tags.map((tag) => <Tag key={tag} color='blue'>{tag}</Tag>)
        }
      </div>

      <br />
      <hr />
      <br />

      {
        news.summary && (
          <div
            className='text-muted mt-2 mb-2'
            dangerouslySetInnerHTML={{__html: (news.summary || '')}} />
        )
      }
      {
        news.links && news.links.length > 0 ? (
          <>
            {
              news.links.map((l) => (
                <React.Fragment key={l.id}>
                  <LinkItem key={l.id} title={l.title} url={l.url} summary={l.summary} />
                </React.Fragment>
              ))
            }
          </>
        ) : undefined
      }

      <br />
      <br />
      <hr />

      <br />

      {
        !relatedTagnews ? (
          <Skeleton />
        ) : (
          <div>
            <h3>Related news</h3>
            <br />
            {
              relatedTagnews && relatedTagnews.length > 0 ? (
                relatedTagnews.map((news) => (
                  <div key={news.id} className='mb-2'>
                    <a href={`/news/id/${news.id}`}>
                      {news.title}
                    </a>
                  </div>
                ))
              ) : (
                <div>No related news</div>
              )
            }
          </div>
        )
      }

      <div style={{height: 400}} />

    </div>
  )

}
