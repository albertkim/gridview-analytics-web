interface IProps {
  year: string
  monthlyRezoningMetrics: IRezoningMetric[]
}

interface IRezoningMetric {
  date: string
  applicationCount: number
  approvalCount: number
}

export default function MonthlyStatTable({year, monthlyRezoningMetrics}: IProps) {

  if (!monthlyRezoningMetrics) {
    return null
  }

  const filteredMetrics = monthlyRezoningMetrics
    .filter((metric) => metric.date.includes(year))
    .reverse()

  return (
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
          filteredMetrics.length === 0 && (
            <tr>
              <td colSpan={3} className='text-muted text-center'>
                No data
              </td>
            </tr>
          )
        }
        {
          filteredMetrics.map((metric, index) => {
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
  )

}
