import { APIService } from '@/services/APIService'
import { IBuildingTypeAnalytics } from '@/services/Models'
import { Skeleton } from 'antd'
import { useEffect, useState } from 'react'

export function Analytics() {

  const [buildingTypeAnalytics, setBuildingTypeAnalytics] = useState<IBuildingTypeAnalytics | null>(null)
  
  useEffect(() => {
    const getAnalytics = async function() {
      const analytics = await APIService.getAnalysisByBuildingType('rezoning', 'applied')
      setBuildingTypeAnalytics(analytics)
    }
    getAnalytics()
  }, [])

  let analyticsTableData: any
  if (buildingTypeAnalytics) {
    
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
          <pre>
            {JSON.stringify(buildingTypeAnalytics, null, 2)}
          </pre>
        )
      }
      <br />
    </div>
  )

}
