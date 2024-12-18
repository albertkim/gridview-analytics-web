import { Button, DatePicker, Input, Select, Space, Modal, message, Radio } from 'antd'
import { observer } from 'mobx-react'
import { CreateNewsModel, cityIDMapping } from './CreateNewsModel'
import { APIService } from '@/services/APIService'
import { INews, IRawNews } from '@/services/Models'
import { RichTextEditor } from '@mantine/tiptap'
import { useEditor } from '@tiptap/react'
import React, { useState, useEffect } from 'react'
import TextArea from 'antd/es/input/TextArea'
import StarterKit from '@tiptap/starter-kit'
import dayjs from 'dayjs'

interface IParameters {
  editNews?: INews // Pass through when editing
  editRawNews?: IRawNews // Pass through when creating from raw news
  isModalOpen: boolean
  onSubmit: () => void
  onClose: () => void
}

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

let createNews = new CreateNewsModel()

export const CreateNewsModal = observer(({editNews, editRawNews, isModalOpen, onSubmit, onClose}: IParameters) => {

  const [loading, setLoading] = useState(false)

  const analyzeRawNews = async function() {
    if (editRawNews) {
      createNews.clearForm()
      const analyzedRawNews = await APIService.analyzeRawNews(editRawNews)

      createNews.setCityId(cityIDMapping[analyzedRawNews.city])
      createNews.setTitle(analyzedRawNews.title)
      createNews.setSummary(analyzedRawNews.contents)
      createNews.setDate(analyzedRawNews.date)
      createNews.setMeetingType(analyzedRawNews.meetingType)

      // Add main minute URL
      createNews.links[0].setTitle('Main minute')
      createNews.links[0].setURL(analyzedRawNews.minuteUrl)

      // Add tags
      createNews.setTags(analyzedRawNews.tags)

      // Add report URLs
      analyzedRawNews.reportUrls.forEach((reportUrl) => {
        createNews.addLink()
        createNews.links[createNews.links.length - 1].setTitle(reportUrl.title)
        createNews.links[createNews.links.length - 1].setURL(reportUrl.url)
      })
    }
  }

  // If there is a raw news input, populate the form with AI analysis
  useEffect(() => {
    analyzeRawNews()
  }, [editRawNews])

  // Rich text editor for the news summary section
  const editor = useEditor({
    extensions: [
      StarterKit
    ],
    content: createNews.summary || '',
    onUpdate: ({ editor }) => {
      createNews.setSummary(editor.getHTML())
    }
  })

  useEffect(() => {
    if (createNews.summary) {
      editor?.commands.setContent(createNews.summary)
    } else {
      editor?.commands.setContent(null)
      createNews.clearForm()
    }
  }, [createNews.summary, editor])

  useEffect(() => {
    if (editNews) {
      createNews.clearForm()
      createNews.populateUpdateObject(editNews)
    } else {
      createNews.clearForm()
    }
  }, [editNews])

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
      if (editNews) {
        await APIService.updateNews(editNews.id, createNews.getUpdateNetworkObject())
      } else {
        await APIService.postNews(createNews.getCreateNetworkObject())
      }
      setLoading(false)
      clearForm()
      messageApi.success('News item successfully posted')
      onSubmit()
    } catch (error: any) {
      setLoading(false)
      console.error(error)
      messageApi.error(error.response.data.error)
    }
  }

  return (
    <Modal
      width={1000}
      title={editNews ? `Update news ${editNews.id}` : 'Create news'}
      open={isModalOpen} onCancel={() => onClose()}
      footer={null}>

      {/* For Ant Design message component */}
      {contextHolder}

      <br />

      <div className='row'>

        <div className='col-md-6'>

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
                value={createNews.date ? dayjs(createNews.date) : undefined}
                onChange={(e) => createNews.setDate(e ? e.format('YYYY-MM-DD') : null)}
                style={{width: '100%'}} />
            </div>
          </div>

          <div className='mb-2'>
            <div>Meeting type</div>
            <Input
              value={createNews.meetingType || ''}
              onChange={(e) => createNews.setMeetingType(e.target.value)} />
          </div>

          <div className='mb-2'>
            <Radio.Group value={createNews.important} onChange={(e) => createNews.setImportant(e.target.value)}>
              <Radio value={0}>Not important</Radio>
              <Radio value={1}>Locally important</Radio>
              <Radio value={2}>Globally important</Radio>
            </Radio.Group>
          </div>

          <hr />

          <div className='mb-2'>
            <div>Title</div>
            <Input
              value={createNews.title || ''}
              onChange={(e) => createNews.setTitle(e.target.value)} />
          </div>
          <div className='mb-2'>
            <div>Tags</div>
            <Input
              value={createNews.tags.join(', ')}
              onChange={(e) => createNews.setTags(e.target.value.split(',').map((tag) => tag.trim()))} />
          </div>
          <div className='mb-2'>
            <div>Summary</div>
            <RichTextEditor editor={editor}>
              <RichTextEditor.Toolbar sticky stickyOffset={60}>
                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.Bold />
                </RichTextEditor.ControlsGroup>
                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.BulletList />
                  <RichTextEditor.OrderedList />
                </RichTextEditor.ControlsGroup>
                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.AlignLeft />
                  <RichTextEditor.AlignCenter />
                  <RichTextEditor.AlignJustify />
                  <RichTextEditor.AlignRight />
                </RichTextEditor.ControlsGroup>
                </RichTextEditor.Toolbar>
                <RichTextEditor.Content />
            </RichTextEditor>
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
                      <a className='text-danger' href='#' onClick={() => createNews.removeLink(index)}>[- remove link]</a>
                    </div>
                  </React.Fragment>
                )
              })
            }
            <div className='d-flex justify-content-end'>
              <a href='#' onClick={() => createNews.addLink()}>[+ add link]</a>
            </div>
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

        <div className='col-md-6'>
          <div><b>PREVIEW</b></div>
          <br />
          <pre>
            {
              JSON.stringify(createNews.getCreateNetworkObject(), null, 2)
            }
          </pre>
        </div>

      </div>

    </Modal>
  )

})
