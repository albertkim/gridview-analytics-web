import { APIService } from '@/services/APIService'
import { IBuildingTypeAnalytics } from '@/services/Models'
import { useEffect, useState } from 'react'
import { BuildingTypeTable } from './BuildingTypeTable'
import { Skeleton } from 'antd'

export function Analytics() {

  const [rezoningBuildingTypeAnalytics, setRezoningBuildingTypeAnalytics] = useState<IBuildingTypeAnalytics | null>(null)
  const [developmentPermitBuildingTypeAnalytics, setDevelopmentPermitBuildingTypeAnalytics] = useState<IBuildingTypeAnalytics | null>(null)

  useEffect(() => {
    const getAnalytics = async function () {
      const rezoningAnalytics = await APIService.getAnalysisByBuildingType('rezoning', 'approved')
      const developmentPermitAnalytics = await APIService.getAnalysisByBuildingType('development permit', 'approved')
      setRezoningBuildingTypeAnalytics(rezoningAnalytics)
      setDevelopmentPermitBuildingTypeAnalytics(developmentPermitAnalytics)
    }
    getAnalytics()
  }, [])

  if (!rezoningBuildingTypeAnalytics || !developmentPermitBuildingTypeAnalytics) {
    return (
      <Skeleton active />
    )
  }

  const cities = rezoningBuildingTypeAnalytics.cityData.map((cityData) => cityData.city.cityName)

  return (
    <div className='container-fluid'>

      <br />

      {
        cities.map((city) => {
          const cityRezoningData = rezoningBuildingTypeAnalytics.cityData.find((cityData) => cityData.city.cityName === city)
          const cityDevelopmentPermitData = developmentPermitBuildingTypeAnalytics.cityData.find((cityData) => cityData.city.cityName === city)
          return (
            <>
              <div className='row'>
                <div className='col-md-6'>
                  <br />
                  <h5>{city}</h5>
                  <div className='text-muted'>Rezoning approvals</div>
                  <br />
                  <BuildingTypeTable analytics={cityRezoningData!} />
                  <br />
                </div>
                <div className='col-md-6'>
                  <br />
                  <h5>{city}</h5>
                  <div className='text-muted'>Development permit approvals</div>
                  <br />
                  <BuildingTypeTable analytics={cityDevelopmentPermitData!} />
                  <br />
                </div>
              </div>
              <br />
              <hr />
              <br />
            </>
          )
        })
      }

      <br />

    </div>
  )

}
