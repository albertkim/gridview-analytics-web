import moment from 'moment'
import { Popover, Skeleton } from 'antd'
import { IFullRecord } from '@/services/Models'
import { RezoningStatusBadge } from '../Map/RezoningStatusBadge'

interface IProps {
  sortedRecords: IFullRecord[] | null
  onSelect: (record: IFullRecord) => void
}

export function RezoningTable({sortedRecords, onSelect}: IProps) {

  if (!sortedRecords) {
    return (
      <div className='pt-4 pb-4'>
        <Skeleton />
      </div>
    )
  }

  return (
    <div className='table-responsive'>
      <table className='table table-sm table-striped'>
        <thead className='thead thead-light'>
          <tr>
            <th>City</th>
            <th>Address</th>
            <th>Type</th>
            <th>Stats</th>
            <th>Resources</th>
            <th><a className='text-dark text-decoration-underline'>Last update</a></th>
            <th>Applied</th>
            <th>Approved</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody className='tbody'>
          {
            sortedRecords.map((record) => (
              <tr key={record.id}>
                <td>
                  <span className='text-muted'>{record.city}</span>
                </td>
                <td style={{maxWidth: 150, marginRight: 10}}>
                  <a
                    onClick={() => onSelect(record)}
                    className='text-muted text-decoration-underline'
                    >
                    <div>{record.address}</div>
                  </a>
                </td>
                <td style={{maxWidth: 90, marginRight: 10}}>
                  {record.buildingType}
                </td>
                <td style={{maxWidth: 100, marginRight: 10}}>
                  {
                    !!record.stats.buildings &&
                      <div className='text-muted'><b>Buildings: </b>
                        {record.stats.buildings}
                      </div>
                  }
                  {
                    !!record.stats.storeys &&
                      <div className='text-muted'><b>Storeys: </b>
                        {record.stats.storeys}
                      </div>
                  }
                  {
                    !!record.stats.stratas &&
                      <div className='text-muted'><b>Stratas: </b>
                        {record.stats.stratas}
                      </div>
                  }
                  {
                    !!record.stats.rentals &&
                      <div className='text-muted'><b>Rentals: </b>
                        {record.stats.rentals}
                      </div>
                  }
                  {
                    !!record.stats.hotels &&
                      <div className='text-muted'><b>Hotels: </b>
                        {record.stats.hotels}
                      </div>
                  }
                  {
                    !!record.stats.fsr &&
                      <div className='text-muted'><b>FSR: </b>
                        {record.stats.fsr}
                      </div>
                  }
                </td>
                <td>
                  <div className='mb-1'>
                    {
                      <Popover
                        placement='rightTop'
                        title='Meeting minutes'
                        content={
                          <div>
                            {
                              record.minutesUrls.map((url, index) => (
                                <div key={index}>
                                  <a
                                    href={url.url}
                                    className='text-muted text-decoration-underline'
                                    target='_blank'
                                    rel='noreferrer'
                                    >
                                    {moment(new Date(url.date)).format('MMM YYYY')}
                                  </a>
                                </div>
                              ))
                            }
                          </div>
                        }
                        trigger='click'
                        >
                        <a className='text-muted text-decoration-underline mr-2'>
                          Council minutes
                        </a>
                      </Popover>
                    }
                  </div>
                  <div>
                    {
                      <Popover
                        placement='rightTop'
                        title='Documents'
                        style={{maxWidth: 500}}
                        content={
                          <div>
                            {
                              record.reportUrls.map((url, index) => (
                                <div key={index}>
                                  <a
                                    href={url.url}
                                    className='text-muted text-decoration-underline'
                                    target='_blank'
                                    rel='noreferrer'
                                    >
                                    {url.title} ({moment(new Date(url.date)).format('MMM YYYY')})
                                  </a>
                                </div>
                              ))
                            }
                          </div>
                        }
                        trigger='click'
                        >
                        <a className='text-muted text-decoration-underline'>Documents</a>
                      </Popover>
                    }
                  </div>
                </td>
                <td className='text-muted' style={{maxWidth: 50, marginRight: 10}}>
                  {
                    moment(record.lastUpdateDate).format('YYYY-MM-DD')
                  }
                </td>
                <td className='text-muted' style={{maxWidth: 50, marginRight: 10}}>
                  {record.dates.appliedDate}
                </td>
                <td className='text-muted' style={{maxWidth: 50, marginRight: 10}}>
                  {record.dates.approvalDate}
                </td>
                <td>
                  <RezoningStatusBadge status={record.status} />
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )

}