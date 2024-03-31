import { APIService } from '@/services/APIService'
import { useEffect } from 'react'

export function Analytics() {
  
  useEffect(() => {
    const getAnalytics = async function() {
      const analytics = await APIService.getAnalysisByBuildingType('rezoning', 'applied')
      console.log(analytics)
      return analytics
    }
    getAnalytics()
  }, [])

  return (
    <div>
      <br />
      <h1>Analytics</h1>
      <br />
    </div>
  )

}
