import { Helmet } from "react-helmet"

export function DemoPage() {

  return (
    <div className='container my-5'>

      <Helmet>
        <title>Demo Gridview</title>
        <meta name='description' content='Contact us and learn about our premium metro region datasets.' />
      </Helmet>

      <h1>Join our waitlist</h1>
      <p className='lead mb-4'>We're excited to connect!</p>

      <iframe 
          src='https://xas7x0zd620.typeform.com/to/dGe4YCWH' 
          style={{ width: '100%', height: '500px', border: '0' }} 
          title='demo'
      / >

      <div style={{height: 100}} />

    </div>
  )

}
