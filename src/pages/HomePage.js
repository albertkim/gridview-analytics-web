import { Card, Button, Tag, Image, Tabs } from 'antd'
import headerImage from '../images/city-white-background.png'
import vancouverImage from '../images/vancouver-zoning.png'
import { EyeOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

export function HomePage() {

  return (
    <div>

      <div className='text-center text-white dark-img' style={{
        backgroundImage: `url(${headerImage})`,
        backgroundPosition: 'center',
        paddingTop: 200,
        paddingBottom: 200
      }}>
        <div className='container'>
          <div className='row'>
            <div className='col-md-8 mx-auto'>
              <h1 className='display-4 fw-bold mb-4'>The competitive edge you need for your real estate investments</h1>
              <p className='lead mb-4'>Gridview Analytics helps track zoning changes, understand municipal capital projects, and master your city politics across your entire North American city portfolio.</p>
              <div>
                <Link to='/demo'>
                  <Button className='mr-4' type='primary' size='large' style={{ marginRight: 15 }}>
                    Join the waitlist
                  </Button>
                </Link>
                <Link to='/about'>
                  <Button size='large'>
                    About us
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='container my-5 px-5 py-5'>
        <div className='row'>
          <div className='col-md-6'>
            <h2>Stay on top of building applications and zoning changes</h2>
            <br />
            <p className='lead'>
              Add cities to your watchlist and get a bird's eye view on what projects are being approved or denied. Be the first to know of potential or approved major zoning changes that can multiply nearby land values.
            </p>
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
                label: 'Chicago',
                children: (
                  <div>

                  </div>
                )
              },
              {
                key: '3',
                label: 'New York',
                children: (
                  <div>

                  </div>
                )
              }
            ]} />

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

      <div className='container my-5 px-5 py-5'>
        <div className='row'>
          <div className='col-md-6'>
            <h2>Track municipal capital projects</h2>
            <br />
            <p className='lead'>
              Municipal governments are a powerful force in driving major investment projects.
            </p>
            <p className='lead'>
              Understand where major government capital is being deployed on large projects such as entertainment districts, stadiums, community centers, parks, and more. Get ahead of everyone else by following the political conversations and measuring risk years in advance.
            </p>
          </div>
          <div className='col-md-6'>

            <Image src={vancouverImage} />

            <table className='table mt-4'>
              <thead>
                <tr>
                  <th>Date proposed</th>
                  <th>Description</th>
                  <th>Est. cost</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>06/30/2023</td>
                  <td>Approval for project A-437266</td>
                  <td>~$10,000,000 CAD</td>
                </tr>
                <tr>
                  <td>07/01/2023</td>
                  <td>Approval for project A-373264</td>
                  <td>~$85,000,000 CAD</td>
                </tr>
                <tr>
                  <td>07/23/2023</td>
                  <td>Approval for project A-479856</td>
                  <td>~$150,000,000 CAD</td>
                </tr>
              </tbody>
            </table>

          </div>
        </div>
      </div>

      <div className='container my-5 px-5 py-5'>
        <div className='row'>
          <div className='col-md-6'>
            <h2>Understand municipal politics like never before</h2>
            <br />
            <p className='lead'>City politics are obsure, hard to understand, and different for every city. Gridview Analytics simplifies all happenings as they relate to real estate and zoning and filters out the noise.</p>
            <p className='lead'>Look up political discussions based on zone/address, and stay in tune with sentiment from both politicians and the public. Get the intelligence you need to protect your investments.</p>
          </div>
          <div className='col-md-6'>

            <div className='d-flex mb-4'>
              <Card title='🏙️ City of Vancouver' style={{ width: 300, marginRight: 20 }}>
                <div>
                  Population: 662,248 (2021)
                </div>
                <div>
                  2022 tax revenues: $1.747 billion
                </div>
                <div>
                  2022 spending: $1.75 billion
                </div>
                <div>Re-election: June 24, 2024</div>
              </Card>
              <Card title='👨 John Smith' style={{ width: 300 }}>
                <div>
                  Position: City councillor
                </div>
                <div>Re-election: June 24, 2024</div>
                <div>Public salary: $90,000 CAD</div>
                <div><a href='#'>See voting record</a></div>
              </Card>
            </div>

            <table className='table mb-4'>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Subject</th>
                  <th>Vote</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>06/30/2023</td>
                  <td>Approval for project A-437266</td>
                  <td><Tag color='green'>Yes</Tag></td>
                </tr>
                <tr>
                  <td>07/01/2023</td>
                  <td>Approval for project A-373264</td>
                  <td><Tag color='red'>No</Tag></td>
                </tr>
                <tr>
                  <td>07/23/2023</td>
                  <td>Approval for project A-479856</td>
                  <td><Tag color='gold'>Abstain</Tag></td>
                </tr>
              </tbody>
            </table>

            <table className='table'>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Type</th>
                  <th>Summary</th>
                  <th>Votes</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>06/30/2023</td>
                  <td>Weekly council meeting</td>
                  <td>Routine discussions</td>
                  <td><a href='#'>See votes (1)</a></td>
                </tr>
                <tr>
                  <td>07/01/2023</td>
                  <td>Downtown Chinatown action plan</td>
                  <td>Land zoning discussion</td>
                  <td className='text-muted'>No votes</td>
                </tr>
                <tr>
                  <td>07/02/2023</td>
                  <td>Downtown Chinatown action plan</td>
                  <td>Land zoning discussion</td>
                  <td><a href='#'>See votes (3)</a></td>
                </tr>
              </tbody>
            </table>

          </div>
        </div>
      </div>

      <div className='container my-5 px-5 py-5'>
        <h2 className='text-center'>👨‍💻 North America's only API for projects and politics</h2>
        <br />
        <p className='text-center lead'>Supercharge your applications with unique data only available through our platform.</p>
        <div style={{ height: 100 }} />
        <div className='row'>
          <div className='col-md-6'>
            <pre>
              <code>
                GET: CAPITAL PROJECTS NEAR [COORDINATES]
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
                        public_salary: 120000,
                        public_salary_currency: 'CAD',
                        voting_record: "[...]"
                      },
                      {
                        person_id: 25,
                        person_name: 'Sarah Kirby Young',
                        type: 'Councillor',
                        election_date: '2023',
                        reelection_date: '2026',
                        public_salary: 90000,
                        public_salary_currency: 'CAD',
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
