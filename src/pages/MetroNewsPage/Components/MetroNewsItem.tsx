interface NewsItemProps {
  id: number
  date: string
  title: string
}

export function MetroNewsItem({id, date, title}: NewsItemProps) {

  return (
    <div className='mb-2'>
      <div className='d-flex justify-content-between align-items-start'>
        <p className='mb-0 flex-grow-1 text-wrap pe-2'>
          <a className='text-dark text-decoration-underline' href={`/news/id/${id}`}>
            {title}
          </a>
        </p>
        <span className='text-muted text-nowrap text-right'>{date || 'No date'}</span>
      </div>
    </div>
  )

}
