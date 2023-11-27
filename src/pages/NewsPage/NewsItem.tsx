import { Popover, Tag } from 'antd'
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

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen)
  }

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
                  (
                    <div>
                      <a href={l.url} target='_blank' rel='noreferrer'>
                        {l.title}
                      </a>
                      {
                        l.summary ? (
                          <Popover
                            content={
                              <div style={{width: 400}}>
                                <div><b>{l.title}</b></div>
                                <div className='mb-2'>
                                  <a href={l.url} target='_blank' rel='noreferrer'>Source URL</a>
                                </div>
                                <div className='text-muted'>{l.summary}</div>
                              </div>
                            }
                            trigger='click'
                            open={open}
                            onOpenChange={(e) => handleOpenChange(e)}
                            placement='bottom'
                          >
                            <Tag color='default' style={{cursor: 'pointer', marginLeft: '0.5rem'}}>
                              Details
                            </Tag>
                          </Popover>
                        ) : undefined
                      }
                    </div>
                  )
                )
              }
            </>
          ) : undefined
        }
      </div>
    </div>
  )

}
