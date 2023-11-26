import { Popover } from 'antd'
import React, { useState } from 'react'

interface NewsItemProps {
  date: string
  title: string
  sentiment?: string
  contents?: string
  tooltip?: string
  links: Array<{title: string, summary?: string, url: string}>
}

export function NewsItem({date, title, sentiment, contents, tooltip, links}: NewsItemProps) {
  const [open, setOpen] = useState(false);

  const hide = () => {
    setOpen(false);
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  return (
    <div className='mb-2'>
      <div className='d-flex justify-content-between align-items-center'>
        <p className='mb-0 flex-grow-1 text-wrap pe-2'><b>{title}</b></p>
        <span className='text-muted text-nowrap text-right'>{date || 'No date'}</span>
      </div>
      <div className='text-muted'>Sentiment: {sentiment}</div>
      <div className='text-muted'>{contents}</div>
      <div>
        {
          links && links.length > 0 ? (
            <>
              {
                links.map((l) => 
                  l.summary ? 
                  (<div>
                    <Popover
                      content={
                        <div style={{width: 400}}>
                          <p>{l.summary}</p>
                          <p><a className='mr-2' href={l.url} target='_blank' rel='noreferrer'>Source</a></p>
                          <a onClick={hide}>Close</a>
                        </div>
                      }
                      title={l.title}
                      trigger="click"
                      open={open}
                      onOpenChange={(e) => handleOpenChange(e)}
                      placement="bottom"
                    >
                    <div>{l.title}</div>
                    </Popover>

                  </div>) :
                  (<div><a className='mr-2' href={l.url} target='_blank' rel='noreferrer'>{l.title}</a></div>)
                )
              }
            </>
          ) : undefined
        }
      </div>
    </div>
  )

}
