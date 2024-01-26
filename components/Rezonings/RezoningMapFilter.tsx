import { MapFilterModel, IMapFilter } from '@/components/MapFilterModel'
import { ZoningStatus, ZoningType } from '@/services/Models'
import { Button, Select, Space } from 'antd'
import { observer } from 'mobx-react'

interface IProps {
  mapFilterModel: MapFilterModel
  onApply: (filter: IMapFilter) => void
}

export const RezoningMapFilter = observer(({mapFilterModel, onApply}: IProps) => {

  if (!mapFilterModel) {
    return null
  }

  return (
    <div>

      <Space wrap>

        <Select<string[] | null>
          mode='multiple'
          allowClear
          placeholder='Select cities'
          maxTagCount={0}
          maxTagPlaceholder={(e) => {
            const selectedItems = e.filter((item) => item.value)
            if (selectedItems.length === 0) return 'All cities'
            else if (selectedItems.length === 1) return `1 city selected`
            else return `${selectedItems.length} cities selected`
          }}
          style={{ width: 200 }}
          value={mapFilterModel.cities}
          onChange={(cities) => mapFilterModel.setCities(cities)}>
          <Select.Option value='Vancouver'>Vancouver</Select.Option>
          <Select.Option value='Richmond'>Richmond</Select.Option>
          <Select.Option value='Burnaby'>Burnaby</Select.Option>
          <Select.Option value='Surrey'>Surrey</Select.Option>
        </Select>

        <Select<ZoningType[] | null>
          mode='multiple'
          allowClear
          placeholder='Rezoning types'
          maxTagCount={0}
          maxTagPlaceholder={(e) => {
            const selectedItems = e.filter((item) => item.value)
            if (selectedItems.length === 0) return 'All rezoning types'
            else if (selectedItems.length === 1) return `1 type selected`
            else return `${selectedItems.length} types selected`
          }}
          style={{ width: 200 }}
          value={mapFilterModel.rezoningTypes}
          onChange={(types) => mapFilterModel.setRezoningTypes(types)}>
          <Select.Option value='single-family residential'>Single-Family Residential</Select.Option>
          <Select.Option value='townhouse'>Townhouse</Select.Option>
          <Select.Option value='mixed use'>Mixed Use</Select.Option>
          <Select.Option value='multi-family residential'>Multi-Family Residential</Select.Option>
          <Select.Option value='industrial'>Industrial</Select.Option>
          <Select.Option value='commercial'>Commercial</Select.Option>
          <Select.Option value='other'>Other</Select.Option>
        </Select>

        {/** Zoning status filter */}
        <Select<ZoningStatus[] | null>
          mode='multiple'
          allowClear
          placeholder='Rezoning statuses'
          maxTagCount={0}
          maxTagPlaceholder={(e) => {
            const selectedItems = e.filter((item) => item.value)
            if (selectedItems.length === 0) return 'All rezoning statuses'
            else if (selectedItems.length === 1) return `1 status selected`
            else return `${selectedItems.length} statuses selected`
          }}
          style={{ width: 200 }}
          value={mapFilterModel.rezoningStatuses}
          onChange={(statuses) => mapFilterModel.setRezoningStatuses(statuses)}>
          <Select.Option value='applied'>Applied</Select.Option>
          <Select.Option value='public hearing'>Public hearing</Select.Option>
          <Select.Option value='approved'>Approved</Select.Option>
          <Select.Option value='denied'>Denied</Select.Option>
          <Select.Option value='withdrawn'>Withdrawn</Select.Option>
        </Select>

        <Button type='primary' onClick={() => onApply(mapFilterModel.getFilter())}>Apply</Button>

      </Space>

    </div>
  )

})
