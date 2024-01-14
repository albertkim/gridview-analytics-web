import { MapFilterModel, IMapFilter } from '@/components/MapFilterModel'
import { ZoningStatus, ZoningType } from '@/services/Models'
import { Button, Select, Space } from 'antd'

interface IProps {
  mapFilterModel: MapFilterModel
  onApply: (filter: IMapFilter) => void
}

export default function RezoningMapFilter({mapFilterModel, onApply}: IProps) {

  return (
    <div>

      <Space wrap>

        <Select
          mode='multiple'
          allowClear
          placeholder='Select cities'
          maxTagCount={0}
          maxTagPlaceholder={(e) => `${e.length} cities selected`}
          style={{ width: 200 }}
          onChange={(cities: string[]) => mapFilterModel.setCities(cities)}>
          <Select.Option value='Vancouver'>Vancouver</Select.Option>
          <Select.Option value='Richmond'>Richmond</Select.Option>
          <Select.Option value='Burnaby'>Burnaby</Select.Option>
        </Select>

        <Select
          mode='multiple'
          allowClear
          placeholder='Rezoning types'
          maxTagCount={0}
          maxTagPlaceholder={(e) => `${e.length} type selected`}
          style={{ width: 200 }}
          onChange={(types: ZoningType[]) => mapFilterModel.setRezoningTypes(types)}>
          <Select.Option value='single-family residential'>Single-Family Residential</Select.Option>
          <Select.Option value='townhouse'>Townhouse</Select.Option>
          <Select.Option value='mixed use'>Mixed Use</Select.Option>
          <Select.Option value='multi-family residential'>Multi-Family Residential</Select.Option>
          <Select.Option value='industrial'>Industrial</Select.Option>
          <Select.Option value='commercial'>Commercial</Select.Option>
        </Select>

        {/** Zoning status filter */}
        <Select
          mode='multiple'
          allowClear
          placeholder='Rezoning statuses'
          maxTagCount={0}
          maxTagPlaceholder={(e) => `${e.length} status selected`}
          style={{ width: 200 }}
          onChange={(statuses: ZoningStatus[]) => mapFilterModel.setRezoningStatuses(statuses)}>
          <Select.Option value='applied'>Applied</Select.Option>
          <Select.Option value='public hearing'>Public hearing</Select.Option>
          <Select.Option value='approved'>Approved</Select.Option>
          <Select.Option value='rejected'>Rejected</Select.Option>
          <Select.Option value='withdrawn'>Withdrawn</Select.Option>
        </Select>

        <Button type='primary' onClick={() => onApply(mapFilterModel.getFilter())}>Apply</Button>

      </Space>

    </div>
  )

}
