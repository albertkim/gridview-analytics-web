import moment from 'moment'
import { Popover } from 'antd'
import { IFullRecordDetail } from '@/services/Models'
import { RezoningStatusBadge } from './RezoningStatusBadge'

function truncateString(str: string | null, maxLength: number) {
  if (!str) {
    return ''
  } else if (str.length > maxLength) {
    return str.substring(0, maxLength - 3) + '...'
  } else {
    return str
  }
}

interface IProps {
  sortedRezonings: IFullRecordDetail[]
}

export function RezoningTable({sortedRezonings}: IProps) {

  if (!sortedRezonings) {
    return null
  }

  return (
    <div className='table-responsive'>
      <table className='table table-sm table-striped'>
        <thead className='thead thead-light'>
          <tr>
            <th>Address</th>
            <th>Type</th>
            <th>Description</th>
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
            sortedRezonings.map((rezoning) => (
              <tr key={rezoning.id}>
                <td style={{maxWidth: 150, marginRight: 10}}>
                  <div>
                    <b className='text-muted'>{rezoning.city}</b>
                  </div>
                  <a
                    className='text-muted text-decoration-underline'
                    href={`https://www.google.com/maps/search/?api=1&query=${rezoning.address}, ${rezoning.city}}`}
                    target='_blank'
                    rel='noreferrer'
                    >
                    <div>{rezoning.address}</div>
                  </a>
                </td>
                <td style={{maxWidth: 90, marginRight: 10}}>
                  {rezoning.buildingType}
                </td>
                <td className='text-muted' style={{maxWidth: 200, marginRight: 10}}>
                  {truncateString(rezoning.description, 150)}
                </td>
                <td style={{maxWidth: 100, marginRight: 10}}>
                  {
                    !!rezoning.stats.buildings &&
                      <div className='text-muted'><b>Buildings: </b>
                        {rezoning.stats.buildings}
                      </div>
                  }
                  {
                    !!rezoning.stats.storeys &&
                      <div className='text-muted'><b>Storeys: </b>
                        {rezoning.stats.storeys}
                      </div>
                  }
                  {
                    !!rezoning.stats.stratas &&
                      <div className='text-muted'><b>Stratas: </b>
                        {rezoning.stats.stratas}
                      </div>
                  }
                  {
                    !!rezoning.stats.rentals &&
                      <div className='text-muted'><b>Rentals: </b>
                        {rezoning.stats.rentals}
                      </div>
                  }
                  {
                    !!rezoning.stats.hotels &&
                      <div className='text-muted'><b>Hotels: </b>
                        {rezoning.stats.hotels}
                      </div>
                  }
                  {
                    !!rezoning.stats.fsr &&
                      <div className='text-muted'><b>FSR: </b>
                        {rezoning.stats.fsr}
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
                              rezoning.minutesUrls.map((url, index) => (
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
                              rezoning.reportUrls.map((url, index) => (
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
                    moment.max(rezoning.reportUrls.map(obj => moment(obj.date))).fromNow()
                  }
                </td>
                <td className='text-muted' style={{maxWidth: 50, marginRight: 10}}>
                  {rezoning.dates.appliedDate}
                </td>
                <td className='text-muted' style={{maxWidth: 50, marginRight: 10}}>
                  {rezoning.dates.approvalDate}
                </td>
                <td>
                  <RezoningStatusBadge status={rezoning.status} />
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )

}