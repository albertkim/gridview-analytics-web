import { Button, Input, Space } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { useState } from 'react'

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

export function AdminPage() {

  const [formData, setFormData] = useState<ICreateNews>({
    title: null,
    summary: null,
    meetingType: null,
    cityId: null,
    date: null,
    sentiment: null,
    links: [
      {
        title: null,
        summary: null,
        url: null
      }
    ]
  })

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
            <Input />
          </div>
          <div className='mb-2'>
            <div>Summary</div>
            <TextArea rows={4} />
          </div>
          <div className='mb-2' style={{paddingLeft: 24}}>
            <div>Links <a href='#'>[add link]</a></div>
            {
              formData.links.map((link) => {
                return (
                  <>
                    <div className='mb-2'>
                      <div>Title</div>
                      <Input />
                    </div>
                    <div className='mb-2'>
                      <div>Summary</div>
                      <TextArea rows={4} />
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
              JSON.stringify(formData, null, 2)
            }
          </pre>
        </div>

      </div>

    </div>
  )

}
