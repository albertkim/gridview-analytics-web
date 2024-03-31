import { BuildingType, IBuildingTypeAnalytics } from '@/services/Models'
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

  let transformedData: {
    city: string
    yearData: {
      year: string
      buildingTypeData: {
        [key in BuildingType]: number
      }
    }[]
  }[] = []

  // Configure empty cities arrays
  for (const yearData of analytics.data) {
    for (const cityName in yearData.data) {
      if (!transformedData.find((data) => data.city === cityName)) {
        transformedData.push({
          city: cityName,
          yearData: []
        })
      }
    }
  }

  // Configure empty years arrays
  for (const transformedCityData of transformedData) {
    for (const yearData of analytics.data) {
      transformedCityData.yearData.push({
        year: yearData.year,
        buildingTypeData: {
          'single-family residential': 0,
          'townhouse': 0,
          'mixed use': 0,
          'multi-family residential': 0,
          'industrial': 0,
          'commercial': 0,
          'other': 0
        }
      })
    }
  }

  // Fill in the data
  for (const transformedCityData of transformedData) {
    const cityName = transformedCityData.city
    for (const yearData of analytics.data) {
      const year = yearData.year
      for (const transformedYearDataPoint of transformedCityData.yearData) {
        if (transformedYearDataPoint.year === year) {
          for (const buildingType in yearData.data[cityName]) {
            const castedBuildingType = buildingType as BuildingType
            transformedYearDataPoint.buildingTypeData[castedBuildingType] = yearData.data[cityName][castedBuildingType]
          }
        }
      }
    }
  }

  return (
    <>
      {
        transformedData.map((cityData) => (
          <div key={cityData.city}>
            <h3>{cityData.city}</h3>
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
