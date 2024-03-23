import { LinkItem } from "@/components/LinkItem"

interface NewsItemProps {
  id: number
  date: string
  title: string
  summary: string | null
  links: Array<{
    id: number,
    title: string,
    summary: string | null,
    url: string
  }>
}

export function CityNewsItem({id, date, title, summary: contents, links}: NewsItemProps) {

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
        contents && (
          <div
            className='text-muted mt-2 mb-2'
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
