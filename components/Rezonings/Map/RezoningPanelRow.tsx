import { IFullRecord, IListRecord } from '@/services/Models'
import { Badge, Skeleton } from 'antd'
import { RezoningStatusBadge } from './RezoningStatusBadge'
import { getBuildingTypeColours } from '@/services/MapUtilities'
import moment from 'moment'

interface IProps {
  listRecord: IListRecord
  fullRecord: IFullRecord | null
  expanded: boolean | null
  onFullDetailsClick: () => void
}

export function RezoningPanelRow({listRecord, fullRecord, expanded, onFullDetailsClick}: IProps) {

  if (!listRecord) {
    return null
  }

  return (
    <div style={{position: 'relative', backgroundColor: expanded ? '#f5f5f5' : 'white'}}>

      <div style={{padding: 15}}>

        <div style={{position: 'absolute', top: 5, right: 0}}>
          <RezoningStatusBadge status={listRecord.status} />
        </div>

        <div>
          <Badge
            style={{marginRight: 5}}
            color={getBuildingTypeColours(listRecord.buildingType) as any} />
          <span className='text-muted'>
            {listRecord.buildingType || 'ERROR'}
          </span>
        </div>

        <div>
          {listRecord.address || ' - '}, {listRecord.city}
        </div>

        <div className='text-muted'>
          {
            [
              !!listRecord.stats.storeys ? `${listRecord.stats.storeys} storeys` : null,
              !!listRecord.stats.stratas ? `${listRecord.stats.stratas} stratas` : null,
              !!listRecord.stats.rentals ? `${listRecord.stats.rentals} rentals` : null,
            ].filter((r) => r).join(', ')
          }
        </div>

        <div className='text-muted'>
          Updated: {moment(listRecord.lastUpdateDate).format('MMM DD, YYYY')}
        </div>

        {
          expanded && (
            !fullRecord ? (
              <Skeleton />
            ) : (
              <>
                <br />
                <div className='text-muted'>
                  {`Applied: ${fullRecord.dates.appliedDate || ' - '}`}
                </div>
                {
                  <div className='text-muted'>
                    {fullRecord.dates.approvalDate && `Approved: ${fullRecord.dates.approvalDate}`}
                  </div>
                }
                <br />
                <div className='text-muted'>
                  {fullRecord.description}
                </div>
                <br />
                <a className='text-description-underscore' onClick={onFullDetailsClick}>View full details</a>
              </>
            )
          )
        }

      </div>

    </div>
  )

}
