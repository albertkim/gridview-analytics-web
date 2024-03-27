import { ICity, INews } from '@/services/Models'
import { Breadcrumb, Tag } from 'antd'
import { LinkItem } from '@/components/LinkItem'
import Head from 'next/head'

interface IProps {
  city: ICity,
  news: INews
}

export function NewsItem({city, news}: IProps) {

  const noHTMLNewsSummary = news.summary ? news.summary.replace(/<[^>]*>?/gm, '').slice(0, 160) : ''

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
