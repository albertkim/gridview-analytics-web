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
              <div><a className='text-white' href='/'>Home</a></div>
              <div><a className='text-white' href='/about'>About</a></div>
            </div>
            <div className='col-md-3'>
              <p className='lead'>Products</p>
              <div><a className='text-white' href='/news'>City news</a></div>
              <div><a className='text-white' href='/waitlist'>City rezoning update data</a></div>
            </div>
          </div>
        </div>
      </div>
  )

}
