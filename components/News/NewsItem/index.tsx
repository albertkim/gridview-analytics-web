import { useRouter } from 'next/router'
import { ICity, INews } from '@/services/Models'
import { Breadcrumb } from 'antd'
import { LinkItem } from '@/components/LinkItem'

interface IProps {
  city: ICity,
  news: INews
}

export function NewsItem({city, news}: IProps) {

  const router = useRouter()
  const newsIdParam = router.query['news-id'] as string

  return (
    <div className='container my-4' style={{ maxWidth: 600 }}>

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
            className='text-muted mt-2 mb-2'
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
