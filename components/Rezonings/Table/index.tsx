import { IMapFilter, MapFilterModel, filterRecords } from '@/components/MapFilterModel'
import { APIService } from '@/services/APIService'
import { IFullRecord } from '@/services/Models'
import { Modal, message } from 'antd'
import { useEffect, useState } from 'react'
import { RezoningTable } from './RezoningTable'
import { RezoningMapFilter } from '../Shared/RezoningMapFilter'
import { FullRezoningContents } from '../Shared/FullRezoningContents'
import { RecordTypeSelector } from '../Shared/RecordTypeSelector'
import Head from 'next/head'

const mapFilter = new MapFilterModel()

export function RezoningsTable({type}: {type: 'rezoning' | 'development permit'}) {

  const [filter, setFilter] = useState<IMapFilter>(mapFilter.getFilter())
  const [records, setRecords] = useState<IFullRecord[] | null>(null)
  const [selectedRecord, setSelectedRecord] = useState<IFullRecord | null>(null)

  useEffect(() => {
    async function getRecords() {
      try {
        const records = type === 'rezoning' ? await APIService.getRezonings() : await APIService.getDevelopmentPermits()
        setRecords(records.data)
      } catch (error) {
        message.error('Failed to get data from server')
      }
    }
    getRecords()
  }, [])

  const sortedRecords: IFullRecord[] | null = filterRecords(records, filter)

  return (
    <div className='container pt-4 pb-4'>

      <Head>
        <title>Gridview - Rezoning and development permit table</title>
        <meta name='description' content='View rezoning and development permit tabular data' />
      </Head>

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
        <div className='mb-2'>
          <RecordTypeSelector type={type} format='table' />
          {!records && <span className='text-muted'>(loading...)</span>}
        </div>
        <RezoningMapFilter mapFilterModel={mapFilter} onApply={(newFilter) => setFilter(newFilter)} />
      </div>

      <br />

      <div className='table-responsive'>
        <RezoningTable sortedRecords={sortedRecords} onSelect={(record) => setSelectedRecord(record)} />
      </div>
      
    </div>
  )

}
