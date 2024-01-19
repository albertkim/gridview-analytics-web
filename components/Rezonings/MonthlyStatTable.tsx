import moment from 'moment'

interface IProps {
  monthlyRezoningMetrics: IRezoningMetric[]
}

interface IRezoningMetric {
  date: string
  applicationCount: number
  approvalCount: number
}

export function MonthlyStatTable({monthlyRezoningMetrics}: IProps) {

  if (!monthlyRezoningMetrics) {
    return null
  }

  if (!monthlyRezoningMetrics.length) {
    return null
  }

  const year = moment(new Date(monthlyRezoningMetrics[0].date)).format('YYYY')

  return (
    <div className='table-responsive'>

      <table className='table table-sm'>
        <thead className='thead'>
          <tr>
            <th>{year}</th>
            <th className='text-right'>Applied</th>
            <th className='text-right'>Approved</th>
          </tr>
        </thead>
        <tbody className='tbody'>
          {
            monthlyRezoningMetrics.length === 0 && (
              <tr>
                <td colSpan={3} className='text-muted text-center'>
                  No data
                </td>
              </tr>
            )
          }
          {
            monthlyRezoningMetrics.map((metric, index) => {
              return (
                <tr key={index}>
                  <td className='text-muted'>{metric.date}</td>
                  <td className='text-muted text-right'>{metric.applicationCount}</td>
                  <td className='text-muted text-right'>{metric.approvalCount}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>

    </div>
  )

}
