import { Alert, Skeleton, Space } from 'antd'
import { Helmet } from 'react-helmet'
import { useParams } from 'react-router-dom'
import { CityNewsPanel } from './Components/CityNewsPanel'
import { useState, useEffect } from 'react'
import { APIService, ICity } from '../../services/APIService'
import { ImportantNewsPanel } from './Components/ImportantNewsPanel'

export function MetroCityPage() {

  const {metroCityParam} = useParams<{ metroCityParam: string }>()
  const metroCityName = metroCityParam ? metroCityParam.replace('_', ' ') : null

  const [cities, setCities] = useState<Array<ICity> | false | null>(null)

  useEffect(() => {

    const getCities = async function() {
      if (metroCityName) {
        try {
          const cities = await APIService.getCities(metroCityName)
          setCities(cities)
        } catch (error) {
          setCities(false)
        }
      } else {
        setCities(false)
      }
    }

    getCities()

  }, [metroCityName])

  if (!metroCityName) {
    return (
      <div>404</div>
    )
  }

  if (cities === false) {
    return (
      <div>
        404
      </div>
    )
  }

  return (
    <div className='container my-4'>

      <Helmet>
        <title>Gridview City News</title>
        <meta name='description' content={`Stay up to date with city developments from ${metroCityName} with links straight from the source.`} />
      </Helmet>

      <div className='text-center table-responsive'>
        <Space split={' | '}>
          <span className='text-muted'>🇨🇦 Metros</span>
          <a className='text-muted' style={{whiteSpace: 'nowrap'}} href='/news/metro_vancouver'>
            Vancouver
          </a>
          <a className='text-muted' style={{whiteSpace: 'nowrap'}} href='/news/metro_calgary'>
            Calgary
          </a>
          <a className='text-muted' style={{whiteSpace: 'nowrap'}} href='/news/metro_toronto'>
            Toronto
          </a>
        </Space>
      </div>
      <div className='text-center table-responsive'>
        <Space split={' | '}>
          <span className='text-muted' style={{whiteSpace: 'nowrap'}}>🇺🇸 Metros (coming soon)</span>
          <a className='text-muted' style={{whiteSpace: 'nowrap'}} href='#'>
            Seattle
          </a>
          <a className='text-muted' style={{whiteSpace: 'nowrap'}} href='#'>
            San Francisco
          </a>
          <a className='text-muted' style={{whiteSpace: 'nowrap'}} href='#'>
            Kansas
          </a>
          <a className='text-muted' style={{whiteSpace: 'nowrap'}} href='#'>
            Miami
          </a>
        </Space>
      </div>
      <hr />

      <h1 className='text-center fw-bold'>{metroCityName.replace('_', ' ').toUpperCase()} REGION</h1>

      <hr />
      <div className='text-center'>
        <Space split=' | ' wrap style={{justifyContent: 'center'}}>
          {
            cities && cities.map((city) => {
              return (
                <a key={city.id} className='text-muted' href={`/news/${city.metroCityShortCode}/city/${city.name}`} style={{whiteSpace: 'nowrap'}}>
                  {city.name}
                </a>
              )
            })
          }
        </Space>
      </div>
      <hr />

      <Alert type='info' message={
        <span>
          Sign up for the <a href='/premium'>Gridview Analytics premium service</a> to get access to detailed rezoning update data.
        </span>
      } />

      <div style={{height: 16}} />

      <div className='row'>

        <div className='col-md-8 mb-2'>
          {
            cities ? (
              <ImportantNewsPanel cityNames={cities.map((city) => city.name)} />
            ) : <Skeleton />
          }
        </div>

        <div className='col-md-4 mb-2 p-4'>
          {
            cities ? (
              <>
                {
                  cities
                    .sort((a, b) => {
                      if (a.newsVisible === b.newsVisible) {
                        return 0
                      } else {
                        return a.newsVisible ? -1 : 1
                      }
                    })
                    .map((city) => {
                      return (
                        <div className='mb-4'>
                          <CityNewsPanel
                            key={city.name}
                            metroCityShortCode={city.metroCityShortCode}
                            cityName={city.name}
                            newsVisible={city.newsVisible} />
                        </div>
                      )
                    })
                }
              </>
            ) : (
              <Skeleton />
            )
          }
        </div>

      </div>

      <div style={{height: 100}} />

    </div>
  )

}
