import { Tag } from 'antd'
import Head from 'next/head'
import headerImage from '@/public/vancouver.png'

export default function Premium() {

  return (
    <div>

      <Head>
        <title>Gridview Premium</title>
        <meta name='description' content='Gridview Premium gives you access to our premium metro region datasets.' />
      </Head>

      <div className='text-center text-white less-dark-img' style={{
        backgroundImage: `url(${headerImage.src})`,
        backgroundPosition: 'center',
        paddingTop: 100,
        paddingBottom: 100
      }}>
        <div className='container'>
          <div className='row'>
            <div className='col-md-8 mx-auto'>
              <h1 className='display-4 fw-bold mb-4'>Gridview Premium</h1>
              <p className='lead mb-4'>Get access to high quality, up-to-date rezoning data updates across multiple municipalities.</p>
            </div>
          </div>
        </div>
      </div>

      <br />

      <div className='container'>

        <br />

        <div className='table-responsive'>
          <table className='table table-sm'>
            <thead>
              <tr>
                <th className='text-muted'>Applicant</th>
                <th className='text-muted'>Address</th>
                <th className='text-muted'>Building Type</th>
                <th className='text-muted'>Status</th>
                <th className='text-muted'>...</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className='text-muted'>PC Urban Properties</td>
                <td className='text-muted'>2596-2660 E 41st Ave</td>
                <td className='text-muted'>Multi-family residential</td>
                <td><Tag color='green'>Approved</Tag></td>
                <td className='text-muted'>...</td>
              </tr>
              <tr>
                <td className='text-muted'>Strand Holdings Ltd.</td>
                <td className='text-muted'>5950-5990 Granville St</td>
                <td className='text-muted'>Multi-family residential</td>
                <td><Tag color='yellow'>Applied</Tag></td>
                <td className='text-muted'>...</td>
              </tr>
              <tr>
                <td className='text-muted'>Chard Development</td>
                <td className='text-muted'>2520 Ontario St and 2-24 E Broadway</td>
                <td className='text-muted'>Mixed use</td>
                <td><Tag color='yellow'>Applied</Tag></td>
                <td className='text-muted'>...</td>
              </tr>
              <tr>
                <td className='text-muted'>Fougere Architecture Inc.</td>
                <td className='text-muted'>4569 Oak St</td>
                <td className='text-muted'>Townhouse</td>
                <td><Tag color='yellow'>Applied</Tag></td>
                <td className='text-muted'>...</td>
              </tr>
              <tr>
                <td className='text-muted'>...</td>
                <td className='text-muted'>...</td>
                <td className='text-muted'>...</td>
                <td className='text-muted'>...</td>
                <td className='text-muted'>...</td>
              </tr>
            </tbody>
          </table>
        </div>

        <br />

        <div className='text-muted text-center'>
          <div>
            Gridview Premium is currently in early beta.
          </div>
          <div>
            For access, contact us at
          </div>
          <div><a href='mailto:albert@gridviewanalytics.com'>albert@gridviewanalytics.com</a></div>
        </div>

      </div>

      <div style={{height: 100}} />

    </div>
  )

}
