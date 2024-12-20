import Head from 'next/head'
import logoImage from '@/public/logo.png'
import headerImage from '@/public/city-white-background.png'
import mapImage from '@/public/vancouver.png'
import { INews } from '@/services/Models'
import { EyeOutlined } from '@ant-design/icons'
import { Button, Tag, Image, Tabs, Space, Skeleton, Typography } from 'antd'
import { useEffect, useState } from 'react'
import { APIService } from '@/services/APIService'

export function Home() {

  const [news, setNews] = useState<INews[] | null>(null)

  useEffect(() => {
    const getImportantNews = async () => {
      const news = await APIService.getNews({ offset: 0, limit: 5, important: 1 })
      setNews(news.data)
    }
    getImportantNews()
  }, [])

  return (
    <div>

      <Head>
        <title>Gridview Analytics - Home</title>
        <meta name='description' content='Stay up to date with city developments with premium rezoning data sets for select metro regions.' />
      </Head>

      <div className='text-white dark-img' style={{
        backgroundImage: `url(${headerImage.src})`,
        backgroundPosition: 'center',
        paddingTop: 25,
        paddingBottom: 50
      }}>
        <div className='container'>
          <div className='row'>
            <div className='col-md-8 px-4' style={{paddingBottom: 100}}>
              <Image
                preview={false}
                src={logoImage.src}
                width={200}
                height={200}
                style={{marginLeft: -50}} />
              <h2 className='display-4 fw-bold mb-4'>Your competitive edge in city developments</h2>
              <p className='lead'>Gridview tracks news, policy, and zoning changes across your North American city portfolio.</p>
              <br />
              <div>
                <Space>
                  <a href='/news'>
                    <Button size='large'>
                      City news
                    </Button>
                  </a>
                  <a href='/premium'>
                    <Button className='mr-4' type='primary' size='large'>
                      Development data
                    </Button>
                  </a>
                </Space>
              </div>
              <br />
              <br />
              <p className='mb-0'>Available: Metro Vancouver</p>
              <p className='mb-4'>Coming soon: Metro Calgary, Metro Toronto, Metro Los Angeles</p>
            </div>
            <div className='col-md-4 d-none d-md-block'>
              {
                !news ? (
                  <div style={{paddingTop: 100}}>
                    <Skeleton />
                  </div>
                ) : (
                  <>
                    <h3>Latest:</h3>
                    {
                      news.map((n) => {
                        return (
                          <div className='bg-white p-3 text-dark rounded mb-2 animate__animated animate__fadeInDown'>
                            <div><b>{n.cityName}</b></div>
                            <Typography.Paragraph ellipsis={{rows: 2}} style={{marginBottom: '2px'}}>
                              <a className='text-dark' href={`/news/id/${n.id}`}>{n.title}</a>
                            </Typography.Paragraph>
                            {
                              n.tags.map((tag) => <Tag key={tag} color='blue'>{tag}</Tag>)
                            }
                          </div>
                        )
                      })
                    }
                    <div className='mt-2'>
                      <a className='text-white' href='/news'>Read more</a>
                    </div>
                  </>
                )
              }
            </div>
          </div>
        </div>
      </div>

      <div className='container my-5 px-4 py-4'>
        <div className='row'>
          <div className='col-md-6 mb-4' style={{paddingRight: 60}}>
            <h2 className='fw-bold'>Follow the primary sources</h2>
            <br />
            <p className='lead'>
              Local news is highly fragmented with low signal-to-noise. Analysts need reliable ways to stay on top of local news.
            </p>
            <p className='lead'>
              Gridview Analytics compiles key updates directly from city hall council documents, complete with PDF links and summaries, in a single place for real estate analysts.
            </p>
            <p className='lead'>
              Add cities to your watch list. Be the first to know of potential or approved major news that can multiply nearby land values.
            </p>
            <br />
            <a href='/news'>
              <Button size='large' type='primary'>View city news</Button>
            </a>
          </div>
          <div className='col-md-6'>

            <div className='text-muted mb-4'>
              <EyeOutlined /> Your city watchlist (3)
            </div>

            <Tabs defaultActiveKey='1' type='card' items={[
              {
                key: '1',
                label: 'Vancouver',
                children: (
                  <div>

                  </div>
                )
              },
              {
                key: '2',
                label: 'Calgary',
                children: (
                  <div>

                  </div>
                )
              },
              {
                key: '3',
                label: 'Toronto',
                children: (
                  <div>

                  </div>
                )
              }
            ]} />

            <div className='table-responsive'>
              <table className='table'>
                <thead>
                  <tr>
                    <th>Meeting date</th>
                    <th>Description</th>
                    <th>Info</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>06/30/2023</td>
                    <td>IC-1 and IC-2 District separation</td>
                    <td><a href='#'>Read more</a></td>
                  </tr>
                  <tr>
                    <td>07/01/2023</td>
                    <td>Various I, RM, 10N zoning changes</td>
                    <td><a href='#'>Read more</a></td>
                  </tr>
                  <tr>
                    <td>07/23/2023</td>
                    <td>Section 2, 4, 5, 10 changes</td>
                    <td><a href='#'>Read more</a></td>
                  </tr>
                  <tr>
                    <td>07/23/2023</td>
                    <td>Density Bonus Rates & Amenity Definitions</td>
                    <td><a href='#'>Read more</a></td>
                  </tr>
                </tbody>
              </table>
            </div>

          </div>
        </div>
      </div>

      <div className='container my-5 px-4 py-4'>
        <div className='row'>
          <div className='col-md-6 mb-4' style={{paddingRight: 60}}>
            <h2 className='fw-bold'>Analyze rezoning and development application data</h2>
            <br />
            <p className='lead'>
              There is no better way to see the future of a city than the rezoning and development applications being discussed at city hall.
            </p>
            <p className='lead'>
              Gridview is the only platform that aggregates and standardizes rezoning and development application data across multiple cities. Get access to high quality, up-to-date data updates across multiple municipalities, and stay ahead of the competition.
            </p>
            <br />
            <a href='/premium'>
              <Button size='large' type='primary'>View development data</Button>
            </a>
          </div>
          <div className='col-md-6'>

            <div>
              <Image src={mapImage.src} preview={false} />
            </div>

            <br />

            <div>
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

          </div>
        </div>
      </div>

      <div className='container my-5 px-4 py-4'>
        <h2 className='fw-bold'>Coming soon: Gridview API</h2>
        <br />
        <div className='row'>
          <div className='col-md-8' style={{paddingRight: 60}}>
            <p className='lead'>Supercharge your real estate platforms with unique data only available through Gridview. Enhance real estate listing data with historical rezoning and devlopment permit data, or enhance your internal analytics models.</p>
          </div>
        </div>
        <div style={{ height: 50 }} />
        <div className='row'>
          <div className='col-md-6'>
            <pre>
              <code>
                GET: MAJOR PROJECTS NEAR [COORDINATES]
                <br /><br />
                RESPONSE:
                <br />
                BODY
                <br />
                {
                  JSON.stringify({
                    data: [
                      {
                        project_id: 12345,
                        project_name: 'Granville Entertainment District',
                        type: 'Entertainment district',
                        completion_date: '2030'
                      },
                      {
                        project_id: 234567,
                        project_name: 'Senakw Development',
                        type: 'Mixed use high density district',
                        completion_date: '2027'
                      },
                      {
                        project_id: 345678,
                        project_name: 'Granville Bridge Project',
                        type: 'Pedestrian-friendly revitalization of the Granville Bridge',
                        completion_date: '2025'
                      },
                    ]
                  }, null, 2)
                }
              </code>
            </pre>
          </div>
          <div className='col-md-6'>
            <pre>
              <code>
                GET: CITY COUNCILLORS IN [CITY]
                <br /><br />
                RESPONSE:
                <br />
                BODY
                <br />
                {
                  JSON.stringify({
                    city: {
                      city_name: 'City of Vancouver'
                    },
                    data: [
                      {
                        person_id: 22,
                        person_name: 'Ken Sim',
                        type: 'Mayor',
                        election_date: '2023',
                        reelection_date: '2026',
                        voting_record: "[...]"
                      },
                      {
                        person_id: 25,
                        person_name: 'Sarah Kirby Young',
                        type: 'Councillor',
                        election_date: '2023',
                        reelection_date: '2026',
                        voting_record: "[...]"
                      },
                    ]
                  }, null, 2)
                }
              </code>
            </pre>
          </div>
        </div>
      </div>

      <div className='text-center' style={{
        paddingTop: 100,
        paddingBottom: 200
      }}>
        <div className='container'>
          <div className='row'>
            <div className='col-md-8 mx-auto'>
              <h1 className='display-4 fw-bold mb-4'>Ready to get started?</h1>
              <p className='lead mb-4'>Be on the cutting edge of municipal land zoning, development, and political intelligence. Never miss an opportunity. Win deals before competitors. Our team is here to help.</p>
              <div>
                <Space>
                  <a href='/news'>
                    <Button size='large'>
                      City news
                    </Button>
                  </a>
                  <a href='/premium'>
                    <Button className='mr-4' type='primary' size='large'>
                      Development data
                    </Button>
                  </a>
                </Space>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )

}
