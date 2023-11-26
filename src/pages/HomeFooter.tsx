import footerImage from '../images/city-blue-background.png'

export function HomeFooter() {

  return (
    <div className='text-white dark-img' style={{
        backgroundImage: `url(${footerImage})`,
        backgroundPosition: 'center',
        paddingTop: 200,
        paddingBottom: 200
      }}>
        <div className='container'>
          <div className='row'>
            <div className='col-md-3'>
              <p className='lead'>Company</p>
              <div><a>Home</a></div>
              <div><a>About</a></div>
              <div><a>Careers</a></div>
              <div><a>Terms and conditions</a></div>
            </div>
            <div className='col-md-3'>
              <p className='lead'>Products</p>
              <div><a>City view</a></div>
              <div><a>Politics view</a></div>
              <div><a>API</a></div>
              <div><a>Services</a></div>
            </div>
          </div>
        </div>
      </div>
  )

}
