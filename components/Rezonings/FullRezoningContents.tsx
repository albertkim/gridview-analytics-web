import { IFullRezoningDetail } from '@/services/Models'
import { RezoningStatusBadge } from './RezoningStatusBadge'

interface IProps {
  rezoning: IFullRezoningDetail
}

export function FullRezoningContents({rezoning}: IProps) {

  if (!rezoning) {
    return null
  }

  return (
    <div>

      <br />

      <div className='row'>
      
        <div className='col-md-4'>
          <div className='border border-gray p-3' style={{borderRadius: 5, height: '100%'}}>
            <div className='text-muted'>Rezoning</div>
            <div>{rezoning.type}</div>
            <br />
            <div className='text-muted'>From: {rezoning.zoning.previousZoningCode}</div>
            <div>{rezoning.zoning.previousZoningDescription}</div>
            <br />
            <div className='text-muted'>To: {rezoning.zoning.newZoningCode}</div>
            <div>{rezoning.zoning.newZoningDescription}</div>
          </div>
        </div>
      
        <div className='col-md-4'>
          <div className='border border-gray p-3' style={{borderRadius: 5, height: '100%'}}>
            <div className='text-muted'>Status</div>
            <div><RezoningStatusBadge status={rezoning.status} /></div>
            <br />
            <table className='table table-sm table-borderless'>
              <tbody>
                <tr>
                  <td className='text-muted'>Applied</td>
                  <td style={{textAlign: 'right'}}>{rezoning.dates.appliedDate || '-'}</td>
                </tr>
                {
                  rezoning.dates.publicHearingDate && (
                    <tr>
                      <td className='text-muted'>Public hearing</td>
                      <td style={{textAlign: 'right'}}>{rezoning.dates.publicHearingDate || '-'}</td>
                    </tr>
                  )
                }
                <tr>
                  <td className='text-muted'>Approved</td>
                  <td style={{textAlign: 'right'}}>{rezoning.dates.approvalDate || '-'}</td>
                </tr>
                {
                  rezoning.dates.denialDate && (
                    <tr>
                      <td className='text-muted'>Denied</td>
                      <td style={{textAlign: 'right'}}>{rezoning.dates.denialDate || '-'}</td>
                    </tr>
                  )
                }
                {
                  rezoning.dates.withdrawnDate && (
                    <tr>
                      <td className='text-muted'>Withdrawn</td>
                      <td style={{textAlign: 'right'}}>{rezoning.dates.withdrawnDate || '-'}</td>
                    </tr>
                  )
                }
              </tbody>
            </table>
          </div>
        </div>

        <div className='col-md-4'>
          <div className='border border-gray p-3' style={{borderRadius: 5, height: '100%'}}>
            <table className='table table-sm table-borderless'>
              <tbody>
                {
                  !!rezoning.stats.buildings &&
                    <tr>
                      <td className='text-muted'>Buildings</td>
                      <td style={{textAlign: 'right'}}>{rezoning.stats.buildings}</td>
                    </tr>
                }
                {
                  !!rezoning.stats.storeys &&
                    <tr>
                      <td className='text-muted'>Storeys</td>
                      <td style={{textAlign: 'right'}}>{rezoning.stats.storeys}</td>
                    </tr>
                }
                {
                  !!rezoning.stats.stratas &&
                    <tr>
                      <td className='text-muted'>Stratas</td>
                      <td style={{textAlign: 'right'}}>{rezoning.stats.stratas}</td>
                    </tr>
                }
                {
                  !!rezoning.stats.rentals &&
                    <tr>
                      <td className='text-muted'>Rentals</td>
                      <td style={{textAlign: 'right'}}>{rezoning.stats.rentals}</td>
                    </tr>
                }
                {
                  !!rezoning.stats.hotels &&
                    <tr>
                      <td className='text-muted'>Hotels</td>
                      <td style={{textAlign: 'right'}}>{rezoning.stats.hotels}</td>
                    </tr>
                }
                {
                  !!rezoning.stats.fsr &&
                    <tr>
                      <td className='text-muted'>FSR</td>
                      <td style={{textAlign: 'right'}}>{rezoning.stats.fsr}</td>
                    </tr>
                }
              </tbody>
            </table>
          </div>
        </div>

      </div>

      <br />

      <div className='row'>

        <div className='col-md-8'>
          <div className='border border-gray p-3' style={{borderRadius: 5}}>

            {
              !!rezoning.rezoningId && (
                <>
                  <div className='text-muted'>Rezoning ID</div>
                  <div>{rezoning.rezoningId}</div>
                  <br />
                </>
              )
            }

            <div className='text-muted'>Address</div>
            <div>{rezoning.address}</div>
            <br />

            <div className='text-muted'>Applicant</div>
            <div>{rezoning.applicant}</div>
            {
              rezoning.behalf && (
                <div>
                  On behalf of {rezoning.behalf}
                </div>
              )
            }
            <br />

            <div className='text-muted'>Description</div>
            {rezoning.description}

          </div>
        </div>

        <div className='col-md-4'>
          <div className='border border-gray p-3' style={{borderRadius: 5}}>
            <div className='text-muted'>Documents</div>
            <table className='table table-sm table-borderless'>
              <tbody>
                {
                  rezoning.urls.map((urlObject, index) => (
                    <tr key={index}>
                      <td>
                        <a
                          href={urlObject.url}
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          {urlObject.title}
                        </a>
                      </td>
                      <td className='text-muted' style={{minWidth: 90, textAlign: 'right'}}>
                        {urlObject.date}
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
            <div className='text-muted'>Meeting minutes</div>
            <table className='table table-sm table-borderless'>
              <tbody>
                {
                  rezoning.minutesUrls.map((urlObject, index) => (
                    <tr key={index}>
                      <td>
                        <a
                          href={urlObject.url}
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          Meeting minutes
                        </a>
                      </td>
                      <td className='text-muted' style={{minWidth: 90, textAlign: 'right'}}>
                        {urlObject.date}
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>
        
      </div>

      <br />

    </div>
  )

}
