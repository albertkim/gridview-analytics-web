import { LinkItem } from "../MetroNewsPage/Components/LinkItem"

interface NewsItemProps {
  id: number
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

export function CityNewsItem({id, date, title, sentiment, summary: contents, links}: NewsItemProps) {

  return (
    <div className='p-2 mb-4'>
      <div className='d-flex justify-content-between align-items-start'>
        <p className='mb-0 flex-grow-1 text-wrap pe-2'>
          <b>
            <a className='text-decoration-underline' href={`/news/id/${id}`}>
              {title}
            </a>
          </b>
        </p>
        <span className='text-muted text-nowrap text-right'>{date || 'No date'}</span>
      </div>
      {
        sentiment && <div className='text-muted'>Sentiment: {sentiment}</div>
      }
      {
        contents && (
          <div
            className='ql-editor text-muted mt-2 mb-2'
            dangerouslySetInnerHTML={{__html: (contents || '')}} />
        )
      }
      {
        links && links.length > 0 ? (
          <>
            {
              links.map((l) => <LinkItem key={l.id} title={l.title} url={l.url} summary={l.summary} />)
            }
          </>
        ) : undefined
      }
    </div>
  )

}
