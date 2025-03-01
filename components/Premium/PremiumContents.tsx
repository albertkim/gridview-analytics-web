export function PremiumContents() {

  return (
    <div>

      <br />
      <h2 className='display-4 fw-bold'>Gridview Premium</h2>
      <br />

      <br />

      <p className='lead'>
        It is challenging to get a birds-eye view on upcoming developments. Each city publishes rezoning and development permit data in different formats, forcing analysts to spend hours every week manually collecting and organizing data.
      </p>

      <p className='lead'>
        Gridview Premium aggregates and standardizing data from multiple cities into a single, easy-to-use platform.
      </p>
      
      <br />

      <p className='lead'>
        <b className='fw-bold'>If you are a realtor, broker, development, or investor,</b> our platform can help you identify potential opportunities and risks in the market. Track future developments in key areas, receive update alerts, and identify opportunities. Use data to differentiate your services from competitors.
      </p>

      <p className='lead'>
        <b className='fw-bold'>If you are a real estate listing software platform</b>, use our API to show rezoning applications and development permits on a map, giving your users a more complete picture of the neighbourhoods they are interested in. Gain a competitive edge by offering a unique view of the future powered by Gridview.
      </p>

      <br />

      <p className='lead fw-bold'>Data fields include:</p>

      <ul className='lead'>
        <li>Address and coordinates</li>
        <li>Links to all primary source documents and PDFs from city websites</li>
        <li>Dates of key stages of development (applied, public hearing, approved)</li>
        <li>Building type (single-family residential, multi-family residential, commercial, etc.)</li>
        <li>Stats about proposed development (ex. storeys, stratas, rentals, etc.)</li>
        <li>Zoning code changes being proposed</li>
        <li>Applicant details</li>
        <li>And more</li>
      </ul>

      <br />

      <p className='lead fw-bold'>See a demo for yourself:</p>
      <div className='mb-2'>
        <a href='/rezonings' className='btn btn-light'>View rezoning data</a>
      </div>
      <div>
        <a href='/development-permits' className='btn btn-light'>View development permit data</a>
      </div>

      <br />

      <p className='lead'>
        Gridview Premium is currently in early beta for Metro Vancouver. Please contact us at <a href='mailto:albert275@gmail.com'>albert275@gmail.com</a> for more information.
      </p>

      <div style={{height: 200}} />

    </div>
  )

}
