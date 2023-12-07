import { Popover, Tag } from 'antd'
import React, { useState } from 'react'

interface LinkItemProps {
  title: string
  url: string
  summary: string | null
}

export function LinkItem({title, url, summary}: LinkItemProps) {

  const [open, setOpen] = useState(false);

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen)
  }

  return (
    <div>
      <a href={url} target='_blank' rel='noreferrer'>
        {title}
      </a>
      {
        summary ? (
          <Popover
            content={
              <div style={{maxWidth: 350}}>
                <div><b>{title}</b></div>
                <div className='mb-2'>
                  <a href={url} target='_blank' rel='noreferrer'>Source URL</a>
                </div>
                <div className='text-muted'>{summary}</div>
              </div>
            }
            trigger='click'
            open={open}
            onOpenChange={(e) => handleOpenChange(e)}
            placement='bottom'
          >
            <Tag color='default' style={{cursor: 'pointer', transform: 'scale(0.8)'}}>
              Details
            </Tag>
          </Popover>
        ) : undefined
      }
    </div>
  )

}
