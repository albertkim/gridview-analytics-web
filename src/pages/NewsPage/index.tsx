import { CityNewsPanel } from "./CityNewsPanel"

export function NewsPage() {

  return (
    <div className='container my-5'>

      <h1 className='text-center fw-bold'>METRO VANCOUVER</h1>

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
