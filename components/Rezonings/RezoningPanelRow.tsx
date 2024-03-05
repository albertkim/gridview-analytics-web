import { IFullRecordDetail, ZoningStatus } from '@/services/Models'
import { Badge } from 'antd'
import { RezoningStatusBadge } from './RezoningStatusBadge'
import { getBuildingTypeColours } from '@/services/MapUtilities'

interface IProps {
  rezoning: IFullRecordDetail
  expanded: boolean | null
  onFullDetailsClick: () => void
}

export function RezoningPanelRow({rezoning, expanded, onFullDetailsClick}: IProps) {

  if (!rezoning) {
    return null
  }

  return (
    <div style={{position: 'relative', backgroundColor: expanded ? '#f5f5f5' : 'white'}}>

      <div style={{padding: 15}}>

        <div style={{position: 'absolute', top: 5, right: 0}}>
          <RezoningStatusBadge status={rezoning.status} />
        </div>

        <div>
          <Badge
            style={{marginRight: 5}}
            color={getBuildingTypeColours(rezoning.buildingType) as any} />
          <span className='text-muted'>
            {rezoning.buildingType || 'ERROR'}
          </span>
        </div>

        <div>
          {rezoning.address || ' - '}, {rezoning.city}
        </div>

        <div className='text-muted'>
          {
            [
              !!rezoning.stats.storeys ? `${rezoning.stats.storeys} storeys` : null,
              !!rezoning.stats.stratas ? `${rezoning.stats.stratas} stratas` : null,
              !!rezoning.stats.rentals ? `${rezoning.stats.rentals} rentals` : null,
            ].filter((r) => r).join(', ')
          }
        </div>

        {
          expanded && (
            <>
              <br />
              <div className='text-muted'>
                {`Applied: ${rezoning.dates.appliedDate || ' - '}`}
              </div>
              {
                <div className='text-muted'>
                  {rezoning.dates.approvalDate && `Approved: ${rezoning.dates.approvalDate}`}
                </div>
              }
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

    </div>
  )

}
