import { Button, Input, Space } from 'antd'
import { observer } from 'mobx-react'
import { useState } from 'react'
import { CreateNews } from './CreateNews'
import TextArea from 'antd/es/input/TextArea'

interface ICreateNews {
  title: string | null
  summary: string | null
  meetingType: string | null
  cityId: number | null
  date: string | null
  sentiment: string | null
  links: Array<{
    title: string | null
    summary: string | null
    url: string | null
  }>
}

const createNews = new CreateNews()

export const AdminPage = observer(() => {

  const environment = process.env.NODE_ENV!

  // This admin page should only be available in local development environments
  if (environment !== 'development') {
    return (
      <div>
        404
      </div>
    )
  }

  return (
    <div className='container my-4'>

      <div className='row'>

        <div className='col-md-6 mb-4'>
          <div className='mb-2'>
            <div>Title</div>
            <Input value={createNews.title || ''} onChange={(e) => createNews.setTitle(e.target.value)} />
          </div>
          <div className='mb-2'>
            <div>Summary</div>
            <TextArea
              rows={4}
              value={createNews.summary || ''}
              onChange={(e) => createNews.setSummary(e.target.value)} />
          </div>
          <br />
          <div className='mb-2' style={{paddingLeft: 24}}>
            <div>Links <a href='#' onClick={() => createNews.addLink()}>[add link]</a></div>
            {
              createNews.links.map((link) => {
                return (
                  <>
                    <hr />
                    <div className='mb-2'>
                      <div>Title</div>
                      <Input value={link.title || ''} onChange={(e) => link.setTitle(e.target.value)} />
                    </div>
                    <div className='mb-2'>
                      <div>URL</div>
                      <Input value={link.url || ''} onChange={(e) => link.setURL(e.target.value)} />
                    </div>
                    <div className='mb-2'>
                      <div>Summary</div>
                      <Input value={link.summary || ''} onChange={(e) => link.setSummary(e.target.value)} />
                    </div>
                  </>
                )
              })
            }
          </div>
          <div className='d-flex justify-content-end'>
            <Space>
              <Button>Clear</Button>
              <Button type='primary'>Submit</Button>
            </Space>
          </div>
        </div>

        <div className='col-md-6 mb-4'>
          <div><b>PREVIEW</b></div>
          <br />
          <pre>
            {
              JSON.stringify(createNews.getNetworkObject(), null, 2)
            }
          </pre>
        </div>

      </div>

    </div>
  )

})
