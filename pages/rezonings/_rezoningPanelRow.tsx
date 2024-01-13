import { IFullRezoningDetail, ZoningStatus } from '@/services/Models'
import { Badge, Tag } from 'antd'

interface IProps {
  rezoning: IFullRezoningDetail
  expanded: boolean | null
  onFullDetailsClick: () => void
}

function getBadgeStatusColor(status: ZoningStatus | null) {
  if (!status) {
    return 'error'
  }
  // Key is of type ZoningStatus, Value is string
  const badgeStatusColorMapping: {[key in ZoningStatus]: string} = {
    'applied': 'default',
    'pending': 'warning',
    'public hearing': 'warning',
    'approved': 'success',
    'denied': 'error',
    'withdrawn': 'error'
  }
  return badgeStatusColorMapping[status] || 'error'
}

export default function RezoningPanelRow({rezoning, expanded, onFullDetailsClick}: IProps) {

  if (!rezoning) {
    return null
  }

  return (
    <div style={{padding: 5, backgroundColor: expanded ? '#f5f5f5' : 'white'}}>

      <div>
        <Badge
          style={{marginRight: 5}}
          status={getBadgeStatusColor(rezoning.status) as any} />
        <span className='text-muted'>
          {rezoning.type || 'ERROR'}
        </span>
      </div>

      <div>
        {rezoning.address || 'ERROR'}
      </div>

      <div className='text-muted'>
        {rezoning.city || 'ERROR'}
      </div>

      {
        expanded && (
          <>
            <br />
            <div className='text-muted'>
              Status: {rezoning.status || 'ERROR'}
            </div>
            <br />
            <div className='text-muted'>
              {rezoning.description}
            </div>
            <br />
            <a className='text-description-underscore' onClick={onFullDetailsClick}>View full details</a>
          </>
        )
      }

    </div>
  )

}