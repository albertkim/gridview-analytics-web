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
        BC | Vancouver | Burnaby | Richmond | Coquitlam | Surrey
      </div>
      <hr />

      <div style={{height: 8}} />

      <div className='row'>

      <div className='col-md-6 mb-4'>
        <CityNewsPanel city='BC (province)' />
      </div>

      <div className='col-md-6 mb-4'>
        <CityNewsPanel city='Vancouver' />
      </div>

      <div className='col-md-6 mb-4'>
        <CityNewsPanel city='Richmond' />
      </div>

      <div className='col-md-6 mb-4'>
        <CityNewsPanel city='Burnaby' />
      </div>

      <div className='col-md-6 mb-4'>
        <CityNewsPanel city='Coquitlam' />
      </div>

      </div>

      <div style={{height: 100}} />

    </div>
  )

}
