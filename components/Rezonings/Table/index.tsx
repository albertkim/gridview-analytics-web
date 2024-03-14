import { IMapFilter, MapFilterModel, filterRezonings } from '@/components/MapFilterModel'
import { APIService } from '@/services/APIService'
import { IFullRecordDetail } from '@/services/Models'
import { Modal, message } from 'antd'
import { useEffect, useState } from 'react'
import { RezoningTable } from './RezoningTable'
import { RezoningMapFilter } from '../Shared/RezoningMapFilter'
import { FullRezoningContents } from '../Shared/FullRezoningContents'

const mapFilter = new MapFilterModel()

export function RezoningsTable() {

  const [filter, setFilter] = useState<IMapFilter>(mapFilter.getFilter())
  const [records, setRecords] = useState<IFullRecordDetail[] | null>(null)
  const [selectedRecord, setSelectedRecord] = useState<IFullRecordDetail | null>(null)

  useEffect(() => {
    async function getRecords() {
      try {
        const rezonings = await APIService.getRezonings()
        setRecords(rezonings.data)
      } catch (error) {
        message.error('Failed to get data from server')
      }
    }
    getRecords()
  }, [])

  const sortedRecords: IFullRecordDetail[] | null = filterRezonings(records, filter)

  return (
    <div className='container pt-4 pb-4'>

      {/** Full details modal */}
      <Modal
        open={!!selectedRecord}
        onCancel={() => setSelectedRecord(null)}
        title={
          <>
            <span>{selectedRecord?.address} </span>
            <a
              className='text-muted text-decoration-underline'
              href={`https://www.google.com/maps/search/?api=1&query=${selectedRecord?.address}, ${selectedRecord?.city}}`}
              target='_blank'
              rel='noreferrer'
              >
              [open in Google Maps]
            </a>
          </>
        }
        footer={null}
        width={1000}>
        {
          !!selectedRecord && <FullRezoningContents rezoning={selectedRecord} />
        }
      </Modal>

      <div>
        <h5 className='mb-3'>Gridview Premium (<a href='/rezonings/map'>go to map view</a>) {!records && <span className='text-muted'>(loading...)</span>}</h5>
        <RezoningMapFilter mapFilterModel={mapFilter} onApply={(newFilter) => setFilter(newFilter)} />
      </div>

      <br />

      <div className='table-responsive'>
        <RezoningTable sortedRecords={sortedRecords} onSelect={(record) => setSelectedRecord(record)} />
      </div>
      
    </div>
  )

}
