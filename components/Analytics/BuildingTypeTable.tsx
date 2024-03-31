import { IBuildingTypeAnalytics } from '@/services/Models'
import { Skeleton } from 'antd'

interface IProps {
  analytics: IBuildingTypeAnalytics | null
}

export function BuildingTypeTable({ analytics }: IProps) {

  if (!analytics) {
    return (
      <Skeleton active />
    )
  }

  return (
    <>
      {
        analytics.cityData.map((cityData) => (
          <div key={cityData.city.cityName}>
            <h3>{cityData.city.cityName}</h3>
            <br />
            <div className='table-responsive'>
              <table className='table table-sm'>
                <thead>
                  <tr>
                    <th className='text-muted'>Year</th>
                    {
                      Object.keys(cityData.yearData[0].buildingTypeData).map((buildingType) => (
                        <th className='text-muted' key={buildingType}>{buildingType}</th>
                      ))
                    }
                  </tr>
                </thead>
                <tbody>
                  {
                    cityData.yearData.map((yearData) => (
                      <tr key={yearData.year}>
                        <td>{yearData.year}</td>
                        {
                          Object.entries(yearData.buildingTypeData).map(([buildingType, count]) => (
                            <td key={buildingType}>{count}</td>
                          ))
                        }
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
            <br />
            <br />
          </div>
        ))
      }
    </>
  )

}
