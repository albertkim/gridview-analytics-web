import { IMapFilter, MapFilterModel, filterRezonings } from '@/components/MapFilterModel'
import { APIService } from '@/services/APIService'
import { IFullRecordDetail } from '@/services/Models'
import { message } from 'antd'
import { useEffect, useState } from 'react'
import { RezoningTable } from './RezoningTable'
import { RezoningMapFilter } from '../Shared/RezoningMapFilter'

const mapFilter = new MapFilterModel()

export function RezoningsTable() {

  const [filter, setFilter] = useState<IMapFilter>(mapFilter.getFilter())
  const [rezonings, setRezonings] = useState<IFullRecordDetail[] | null>(null)

  useEffect(() => {
    async function getRezonings() {
      try {
        const rezonings = await APIService.getRezonings()
        setRezonings(rezonings.data)
      } catch (error) {
        message.error('Failed to get data from server')
      }
    }
    getRezonings()
  }, [])

  const sortedRezonings: IFullRecordDetail[] | null = filterRezonings(rezonings, filter)

  return (
    <div className='container pt-4 pb-4'>

      <div>
        <h5 className='mb-3'>Gridview Premium (<a href='/rezonings/map'>go to map view</a>) {!rezonings && <span className='text-muted'>(loading...)</span>}</h5>
        <RezoningMapFilter mapFilterModel={mapFilter} onApply={(newFilter) => setFilter(newFilter)} />
      </div>

      <br />

      <RezoningTable sortedRezonings={sortedRezonings} />
      
    </div>
  )

}
