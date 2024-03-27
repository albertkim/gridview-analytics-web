import { INews } from '@/services/Models'
import { LinkItem } from '../../LinkItem'
import { Tag } from 'antd'

interface NewsItemProps {
  id: number
  cityName: string
  news: INews
}

export function ImportantNewsItem({id, cityName, news}: NewsItemProps) {

  return (
    <div className='p-2 mb-4'>
      <div className='text-muted'>{cityName}</div>
      <div className='d-flex justify-content-between align-items-start mb-1'>
        <p className='mb-0 flex-grow-1 text-wrap pe-2'>
          <b>
            <a className='text-decoration-underline' href={`/news/id/${id}`}>
              {news.title}
            </a>
          </b>
        </p>
        <span className='text-muted text-nowrap text-right'>{news.date || 'No date'}</span>
      </div>
      <div>
        {
          news.tags.map((tag) => <Tag key={tag} color='blue'>{tag}</Tag>)
        }
      </div>
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
    </div>
  )

}
