import { APIService } from '@/services/APIService'
import { IBuildingTypeAnalytics } from '@/services/Models'
import { useEffect, useState } from 'react'
import { BuildingTypeTable } from './BuildingTypeTable'

export function Analytics() {

  const [rezoningBuildingTypeAnalytics, setRezoningBuildingTypeAnalytics] = useState<IBuildingTypeAnalytics | null>(null)
  const [developmentPermitBuildingTypeAnalytics, setDevelopmentPermitBuildingTypeAnalytics] = useState<IBuildingTypeAnalytics | null>(null)

  useEffect(() => {
    const getAnalytics = async function () {
      const rezoningAnalytics = await APIService.getAnalysisByBuildingType('rezoning', 'applied')
      const developmentPermitAnalytics = await APIService.getAnalysisByBuildingType('development permit', 'approved')
      setRezoningBuildingTypeAnalytics(rezoningAnalytics)
      setDevelopmentPermitBuildingTypeAnalytics(developmentPermitAnalytics)
    }
    getAnalytics()
  }, [])

  return (
    <div className='container-fluid'>

      <div className='row'>

        <div className='col-md-6'>
          <br />
          <h1>Rezonings</h1>
          <br />
          <BuildingTypeTable analytics={rezoningBuildingTypeAnalytics} />
          <br />
        </div>

        <div className='col-md-6'>
          <br />
          <h1>Development permits</h1>
          <br />
          <BuildingTypeTable analytics={developmentPermitBuildingTypeAnalytics} />
          <br />
        </div>

      </div>

    </div>
  )

}
