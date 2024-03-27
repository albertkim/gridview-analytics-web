import { LinkItem } from "@/components/LinkItem"
import { INews } from '@/services/Models'
import { Tag } from 'antd'

interface NewsItemProps {
  news: INews
}

export function CityNewsItem({news}: NewsItemProps) {

  return (
    <div className='p-2 mb-4'>
      <div className='d-flex justify-content-between align-items-start mb-1'>
        <p className='mb-0 flex-grow-1 text-wrap pe-2'>
          <b>
            <a className='text-decoration-underline' href={`/news/id/${news.id}`}>
              {news.title}
            </a>
          </b>
        </p>
        <span className='text-muted text-nowrap text-right'>{news.date || 'No date'}</span>
      </div>
      {
        news.tags.map((tag) => <Tag key={tag} color='blue'>{tag}</Tag>)
      }
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
