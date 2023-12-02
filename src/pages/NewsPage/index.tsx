import { CityNewsPanel } from './CityNewsPanel'

export function NewsPage() {

  return (
    <div className='container my-4'>

      <div className='text-center'>
        <u>Metro Vancouver</u> | Metro Calgary | Metro Toronto | Metro Chicago | Metro New York
      </div>
      <hr />

      <h1 className='text-center fw-bold'>METRO VANCOUVER REGION</h1>

      <hr />
      <div className='text-center'>
        Vancouver | Burnaby | Richmond | North Vancouver | Coquitlam | Delta
      </div>
      <hr />

      <div style={{height: 30}} />

      <div className='row'>

      <div className='col-md-6 mb-4'>
        <CityNewsPanel city='Vancouver' />
      </div>

      <div className='col-md-6 mb-4'>
        <CityNewsPanel city='Richmond' />
      </div>

      <div className='col-md-6 mb-4'>
        <CityNewsPanel city='Burnaby' />
      </div>

      </div>

      <div style={{height: 100}} />

    </div>
  )

}
