export function NewsItem({date, title, sentiment, contents, links}) {

  return (
    <div className='mb-2'>
      <div class='d-flex justify-content-between align-items-center'>
        <p class='mb-0 flex-grow-1 text-wrap pe-2'><b>{title}</b></p>
        <span class='text-muted text-nowrap text-right'>{date || 'No date'}</span>
      </div>
      <div className='text-muted'>Sentiment: {sentiment}</div>
      <div className='text-muted'>{contents}</div>
      <div>
        {
          links && links.length > 0 ? (
            <>
              {
                links.map((l) => <div><a className='mr-2' href={l.url} target='_blank' rel='noreferrer'>{l.title}</a></div>)
              }
            </>
          ) : undefined
        }
      </div>
    </div>
  )

}
