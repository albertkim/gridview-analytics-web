import { Alert, Space } from 'antd'
import { useRouter } from 'next/router'
import { CityNewsPanel } from './CityNewsPanel'
import { ImportantNewsPanel } from './ImportantNewsPanel'
import { ICity, INewsResponse } from '@/services/Models'

interface IProps {
  cities: ICity[] | false
  importantNews: INewsResponse
}

export function MetroCityNews({cities, importantNews}: IProps) {

  const router = useRouter()
  const metroShortcodeParam = router.query['metro-shortcode'] as string
  const metroCityName = metroShortcodeParam ? metroShortcodeParam.replace('_', ' ') : null

  if (!metroCityName || cities === false || cities.length === 0) {
    return (
      <div className='container my-4'>
        404
      </div>
    )
  }

  return (
    <div className='container my-4'>

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
            cities.filter((city) => city.newsVisible).map((city) => {
              return (
                <a
                  key={city.name}
                  className='text-muted'
                  href={`/news/${city.metroCityShortCode}/city/${city.name}`}
                  style={{whiteSpace: 'nowrap'}}>
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
          <ImportantNewsPanel cityNames={cities.map((city) => city.name)} news={importantNews} />
        </div>

        <div className='col-md-4 mb-2 p-4'>
          {
            cities
              .map((city) => {
                return (
                  <div className='mb-4' key={city.name}>
                    <CityNewsPanel
                      metroCityShortCode={city.metroCityShortCode}
                      cityName={city.name}
                      newsVisible={city.newsVisible} />
                  </div>
                )
              })
          }
        </div>

      </div>

      <div style={{height: 100}} />

    </div>
  )

}
