import { APIService } from '@/services/APIService'
import { BuildingType, IBuildingTypeAnalytics } from '@/services/Models'
import { Skeleton } from 'antd'
import build from 'next/dist/build'
import { useEffect, useState } from 'react'

export function Analytics() {

  const [buildingTypeAnalytics, setBuildingTypeAnalytics] = useState<IBuildingTypeAnalytics | null>(null)

  useEffect(() => {
    const getAnalytics = async function () {
      const analytics = await APIService.getAnalysisByBuildingType('rezoning', 'applied')
      setBuildingTypeAnalytics(analytics)
    }
    getAnalytics()
  }, [])

  let transformedData: {
    city: string
    yearData: {
      year: string
      buildingTypeData: {
        [key in BuildingType]: number
      }
    }[]
  }[] = []

  // Transform the building type analytics data to fit the format above
  if (buildingTypeAnalytics) {

    // Configure empty cities arrays
    for (const yearData of buildingTypeAnalytics.data) {
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
      for (const yearData of buildingTypeAnalytics.data) {
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

    console.log(transformedData)

    // Fill in the data
    for (const transformedCityData of transformedData) {
      const cityName = transformedCityData.city
      for (const yearData of buildingTypeAnalytics.data) {
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

  }

  return (
    <div className='container'>
      <br />
      <h1>Analytics</h1>
      <br />
      {
        !buildingTypeAnalytics ? (
          <Skeleton />
        ) : (
          <>
            {
              transformedData.map((cityData) => (
                <>
                  <h3>{cityData.city}</h3>
                  <table className='table table-sm'>
                    <thead>
                      <tr>
                        <th>Year</th>
                        {
                          Object.keys(cityData.yearData[0].buildingTypeData).map((buildingType) => (
                            <th>{buildingType}</th>
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
                                <td>{count}</td>
                              ))
                            }
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
                  <br />
                </>
              ))
            }
          </>
        )
      }
      <br />
    </div>
  )

}
