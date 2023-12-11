import { LinkItem } from './LinkItem'

interface NewsItemProps {
  date: string
  title: string
  sentiment: string | null
  summary: string | null
  links: Array<{
    id: number,
    title: string,
    summary: string | null,
    url: string
  }>
}

export function NewsItem({date, title, sentiment, summary: contents, links}: NewsItemProps) {

  return (
    <div className='mb-2'>
      <div className='d-flex justify-content-between align-items-center'>
        <p className='mb-0 flex-grow-1 text-wrap pe-2'><b>{title}</b></p>
        <span className='text-muted text-nowrap text-right'>{date || 'No date'}</span>
      </div>
      {
        sentiment && <div className='text-muted'>Sentiment: {sentiment}</div>
      }
      <div
        className='text-muted'
        dangerouslySetInnerHTML={{__html: (contents || '').replace(/\\"/g, '"')}} />
      <div>
        {
          links && links.length > 0 ? (
            <>
              {
                links.map((l) => <LinkItem key={l.id} title={l.title} url={l.url} summary={l.summary} />
                )
              }
            </>
          ) : undefined
        }
      </div>
    </div>
  )

}
