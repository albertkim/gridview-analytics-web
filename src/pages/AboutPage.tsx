import { Button } from 'antd'
import backgroundImage from '../images/city-blue-background.png'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'

export function AboutPage() {

  return (
    <div>

      <Helmet>
        <title>About Gridview</title>
        <meta name='description' content='Learn about our team, our mission, and the values driving our company forward.' />
      </Helmet>
      
      <div className='text-center text-white dark-img' style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundPosition: 'center',
        paddingTop: 200,
        paddingBottom: 200
      }}>
        <div className='container'>
          <div className='row'>
            <div className='col-md-8 mx-auto'>
              <h1 className='display-4 fw-bold mb-4'>We believe that cities are the future</h1>
              <p className='lead mb-4'></p>
            </div>
          </div>
        </div>
      </div>

      <div style={{height: 100}} />

      <div className='container py-5'>
        <div className='row'>
          <div className='col-md-8'>
            <h1 className='fw-bold mb-4'>Better cities are inevitable</h1>
            <p className='lead mb-4'>Over the next several decades, we believe that North American cities will undergo a transformation like never before. Our cities have been held back by a variety of poor policies made by those before us, but we believe that it is only a matter of time before changes happen for the better.</p>
          </div>
        </div>
      </div>

      <div style={{height: 50}} />

      <div className='container py-5'>
        <div className='row'>
          <div className='col-md-8'>
            <h1 className='fw-bold mb-4'>We serve the visionaries</h1>
            <p className='lead mb-4'>Not everyone can imagine what a city could be in the future. People might call you crazy. But we need visionaries, those who can invest and build. Gridview Analytics provides the tools they need to move ahead with confidence.</p>
          </div>
        </div>
      </div>

      <div style={{height: 50}} />

      <div className='container py-5'>
        <div className='row'>
          <div className='col-md-8'>
            <h1 className='fw-bold mb-4'>Our team</h1>
            <p className='lead mb-4'>We are passionate optimists about the future of cities. With backgrounds in technology, real estate, consulting and more, we're confident that we're the right mix of people accelerate the future.</p>
          </div>
        </div>
      </div>

      <div className='text-center' style={{
        paddingTop: 200,
        paddingBottom: 200
      }}>
        <div className='container'>
          <div className='row'>
            <div className='col-md-8 mx-auto'>
              <h1 className='display-4 fw-bold mb-4'>Ready to get started?</h1>
              <p className='lead mb-4'>Be on the cutting edge of municipal land zoning, development, and political intelligence. Never miss an opportunity. Win deals before competitors. Our team is here to help.</p>
              <div>
                <Link to='/demo'>
                  <Button className='mr-4' type='primary' size='large'>
                    Join the waitlist
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )

}
