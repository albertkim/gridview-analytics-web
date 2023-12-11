import { Button, DatePicker, Input, Select, Space, message } from 'antd'
import { observer } from 'mobx-react'
import { CreateNews, cityIDMapping } from './CreateNews'
import { APIService } from '../../services/APIService'
import React, { useState } from 'react'
import TextArea from 'antd/es/input/TextArea'
import ReactQuill from 'react-quill'

function toTitleCase(string: string) {
  return string
    .toLowerCase()
    .split(' ')
    .map(word => {
      if (word.length > 2 || ['a', 'an', 'the', 'and', 'but', 'or', 'for', 'nor', 'on', 'at', 'to', 'from', 'by'].indexOf(word) === -1) {
        return word.charAt(0).toUpperCase() + word.slice(1)
      }
      return word
    })
    .join(' ')
}

let createNews = new CreateNews()

export const AdminCreateNewsPage = observer(() => {

  const [loading, setLoading] = useState(false)

  const environment = process.env.NODE_ENV!

  // This admin page should only be available in local development environments
  if (environment !== 'development') {
    return (
      <div>
        404
      </div>
    )
  }

  const [messageApi, contextHolder] = message.useMessage()

  const cityIDArray = Object.entries(cityIDMapping).map((c) => {
    return {
      cityId: c[1],
      cityName: c[0]
    }
  })

  async function clearForm() {
    createNews.clearForm()
  }

  async function submitCreateNewsRequest() {
    try {
      setLoading(true)
      const createdNews = await APIService.postNews(createNews.getNetworkObject())
      setLoading(false)
      console.log(createdNews)
      clearForm()
      messageApi.success('News item successfully posted')
    } catch (error: any) {
      setLoading(false)
      console.error(error)
      messageApi.error(error.response.data.error)
    }
  }

  return (
    <div className='container my-4'>

      {/* For Ant Design message component */}
      {contextHolder}

      <div className='row'>

        <div className='col-md-6 mb-4'>

          <div className='row mb-2'>
            <div className='col-md-6'>
              <div>City</div>
              <Select
                value={createNews.cityId}
                style={{width: '100%'}}
                onChange={(e) => createNews.setCityId(e)}>
                {
                  cityIDArray.map((c) => {
                    return (
                      <Select.Option
                        key={c.cityId}
                        value={c.cityId}>{c.cityName}
                      </Select.Option>
                    )
                  })
                }
              </Select>
            </div>
            <div className='col-md-6'>
              <div>Date</div>
              <DatePicker 
                onChange={(e) => createNews.setDate(e ? e.toDate() : null)}
                style={{width: '100%'}} />
            </div>
          </div>

          <div className='mb-2'>
            <div>Meeting type</div>
            <Input
              value={createNews.meetingType || ''}
              onChange={(e) => createNews.setMeetingType(e.target.value)} />
          </div>
          <hr />
          <div className='mb-2'>
            <div>Title</div>
            <Input
              value={createNews.title || ''}
              onChange={(e) => createNews.setTitle(e.target.value)} />
          </div>
          <div className='mb-2'>
            <div>Summary</div>
            <ReactQuill
              modules={{
                toolbar: [
                  ['bold'],
                  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                  [{ 'indent': '-1'}, { 'indent': '+1' }],
                ]
              }}
              value={createNews.summary || ''}
              onChange={(e) => createNews.setSummary(e)} />
          </div>
          <div className='mb-2'>
            <div>Sentiment</div>
            <Input
              value={createNews.sentiment || ''}
              onChange={(e) => createNews.setSentiment(e.target.value)} />
          </div>
          <hr />
          <div className='mb-2' style={{paddingLeft: 24}}>
            <div>Links <a href='#' onClick={() => createNews.addLink()}>[+ add link]</a></div>
            {
              createNews.links.map((link, index) => {
                return (
                  <React.Fragment key={index}>
                    <hr />
                    <div className='mb-2'>
                      <div>Title</div>
                      <div className='text-muted'>Add [PDF] at the end if applicable. Feel free to paste text with links.</div>
                      <Input
                        value={link.title || ''}
                        onChange={(e) => link.setTitle(e.target.value)}
                        onPaste={(e) => {
                          e.preventDefault()
                          // Try to get HTML content from the clipboard
                          const pastedHtml = e.clipboardData.getData('text/html')
                          const doc = new DOMParser().parseFromString(pastedHtml, 'text/html')
                          const anchor = doc.querySelector('a')

                          if (anchor && anchor.href) {
                            // If HTML content with hyperlink is found
                            link.setTitle(anchor.textContent ? toTitleCase(anchor.textContent) : null)
                            link.setURL(anchor.href)
                          } else {
                            // If no HTML content is found, fallback to plain text
                            const pastedText = e.clipboardData.getData('text/plain')
                            link.setTitle(toTitleCase(pastedText))
                          }
                        }} />
                    </div>
                    <div className='mb-2'>
                      <div>URL</div>
                      <Input
                        value={link.url || ''}
                        onChange={(e) => link.setURL(e.target.value)} />
                    </div>
                    <div className='mb-2'>
                      <div>Summary</div>
                      <TextArea
                        rows={2}
                        value={link.summary || ''}
                        onChange={(e) => link.setSummary(e.target.value)} />
                    </div>
                    <div className='d-flex justify-content-end'>
                      <a href='#' onClick={() => createNews.removeLink(index)}>[- remove link]</a>
                    </div>
                  </React.Fragment>
                )
              })
            }
          </div>
          <br />
          <div className='d-flex justify-content-end'>
            <Space>
              <Button onClick={() => clearForm()}>
                Clear
              </Button>
              <Button type='primary' onClick={() => submitCreateNewsRequest()} loading={loading}>
                Submit
              </Button>
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
          <br />
          <div className='text-muted mb-2'>
            Sample GPT prompt to summarize:
          </div>
          <div className='text-muted'>
            You are summarizing for the purpose of a newsletter where most readers, who are mostly real estate agents, will read your summary in place of reading the document. Do not write "this document", instead imagine yourself as the document replacement. However, you need to provide specifics that are provided in the document if you think it'll be useful for this audience. Make it clear what stage the contents of the document are in (ex. consideration, passed, etc) with dates (if applicable) in a way that's easy to understand. Ideal format is a 1-2 sentence summary followed up by bullet points with details below (if applicable).
          </div>
        </div>

      </div>

    </div>
  )

})
