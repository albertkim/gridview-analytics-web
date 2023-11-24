import { NewsItem } from "./NewsItem"

const newsData = {
  cities: [
    {
      name: 'Vancouver',
      councilMeetingUrl: null,
      links: [
        {
          title: 'Council meetings',
          url: 'https://covapp.vancouver.ca/councilMeetingPublic/CouncilMeetings.aspx'
        },
        {
          title: 'Council meetings (YouTube)',
          url: 'https://www.youtube.com/@VanCityClerk/streams'
        }
      ]
    },
    {
      name: 'Richmond',
      links: [
        {
          title: 'Council meetings (2023)',
          url: 'https://citycouncil.richmond.ca/schedule/WebAgendaMinutesList.aspx?Category=6&Year=2023'
        },
        {
          title: 'Council meetings (YouTube)',
          url: 'https://www.youtube.com/@CityofRichmondBC/streams'
        }
      ]
    },
    {
      name: 'Burnaby',
      links: [
        {
          title: 'Council meetings',
          url: 'https://pub-burnaby.escribemeetings.com/?Year=2023'
        }
      ]
    }
  ],
  news: [
    {
      title: 'Active Transportation Funding',
      summary: 'The council reviewed applications for funding to enhance active transportation infrastructure in Vancouver, aiming to improve mobility and safety for cyclists and pedestrians.',
      sentiment: 'positive negative',
      city: 'Vancouver',
      date: 'Nov 14, 2023',
      meetingType: 'council',
      links: []
    },
    {
      title: 'Industrial Modernization and Intensification Framework',
      summary: 'The council addressed the industrial modernization and intensification framework, discussing updates and policy recommendations to modernize industrial sectors.',
      sentiment: 'neutral',
      city: 'Vancouver',
      date: 'Nov 14, 2023',
      meetingType: 'council',
      links: []
    },
    {
      title: 'UNDRIP Task Force Update',
      summary: 'The UNDRIP task force provided an update on their action plan towards reconciliation, focusing on collaborative work with indigenous communities.',
      sentiment: 'positive',
      city: 'Vancouver',
      date: 'Nov 14, 2023',
      meetingType: 'council',
      links: []
    },
    {
      title: 'BC Lions and Public Safety',
      summary: "The council acknowledged the BC Lions football team's season and discussed public safety matters, highlighting community engagement and youth safety.",
      sentiment: 'neutral',
      city: 'Vancouver',
      date: 'Nov 14, 2023',
      meetingType: 'council',
      links: []
    },
    {
      title: 'Citywide Plan Update',
      summary: "The council was briefed on the citywide plan's progress, highlighting extensive community engagement efforts and strategic planning for Vancouver's long-term development.",
      sentiment: 'neutral',
      city: 'Vancouver',
      date: 'Nov 14, 2023',
      meetingType: 'council',
      links: []
    },
    {
      title: 'Affordable Housing Projects',
      summary: "Council discussed several new affordable housing projects, emphasizing partnerships with developers and community groups to increase housing accessibility.",
      sentiment: 'positive',
      city: 'Vancouver',
      date: 'Nov 14, 2023',
      meetingType: 'council',
      links: []
    },
    {
      title: 'Environmental Sustainability Programs',
      summary: "The council was presented with new environmental sustainability programs, focusing on green initiatives and setting ambitious goals for reducing the city's carbon footprint.",
      sentiment: 'positive',
      city: 'Vancouver',
      date: 'Nov 14, 2023',
      meetingType: 'council',
      links: []
    },
    {
      title: 'Public Safety and Crime Prevention',
      summary: "The council debated public safety issues, focusing on crime prevention strategies and the need for increased police presence and community-based initiatives.",
      sentiment: 'mixed',
      city: 'Vancouver',
      date: 'Nov 14, 2023',
      meetingType: 'council',
      links: []
    },
    {
      title: 'Transportation and Traffic Management',
      summary: "The council reviewed ongoing transportation policies, discussing traffic management plans and the integration of new technologies to improve citywide mobility.",
      sentiment: 'neutral',
      city: 'Vancouver',
      date: 'Nov 14, 2023',
      meetingType: 'council',
      links: []
    },
    {
      title: 'Public Concerns on Albridge Extension Contract',
      summary: "Multiple residents voiced concerns about safety, drug use, and crime escalation in their neighborhood, attributing these issues to the Albridge extension contract. They stressed the need for responsible behavior and better management.",
      sentiment: 'concerned',
      city: 'Richmond',
      date: 'Nov 14, 2023',
      meetingType: 'council',
      links: []
    },
    {
      title: 'Review of Utility Rates and Budgets',
      summary: "The council reviewed utility rates and budgets, focusing on the need for infrastructure investments and the impact on future rate increases. The discussion emphasized managing and mitigating these increases effectively.",
      sentiment: 'neutral',
      city: 'Richmond',
      date: 'Nov 14, 2023',
      meetingType: 'council',
      links: []
    },
    {
      title: 'Arts and Heritage Initiatives',
      summary: "The Council discussed the Richmond Arts facility needs assessment and the Steveston Heritage interpretive framework, emphasizing the importance of cultural diversity and connecting past and present in community development.",
      sentiment: 'positive',
      city: 'Richmond',
      date: 'Nov 14, 2023',
      meetingType: 'council',
      links: []
    },
    {
      title: 'Business Licenses for Body Rub Parlors and Escort Services',
      summary: "During the meeting, a councilor expressed concerns regarding the issuance of business licenses to body rub parlors and escort services, highlighting their potential connection to the sex trade industry and human trafficking.",
      sentiment: 'concerned',
      city: 'Richmond',
      date: 'Nov 14, 2023',
      meetingType: 'council',
      links: []
    },
    {
      title: 'Park prioritization framework',
      summary: "Purpose: To provide information to Council about the proposed park prioritization framework for the sustainable management of the City's parkland and outdoor amenities. Staff presentation by Andre Isakov, Director PRC Planning, and Heather Edwards, Manager Parks Planning Design and Development.",
      sentiment: 'concerned',
      city: 'Burnaby',
      date: 'Nov 20, 2023',
      meetingType: 'council',
      links: [
        {
          title: 'Council meeting (with video)',
          url: 'https://pub-burnaby.escribemeetings.com/Meeting.aspx?Id=d2a93368-043a-48c6-8fa6-dc0cbf0b10ea&Agenda=Agenda&lang=English&Item=46&Tab=attachments'
        },
        {
          title: 'Park Prioritization Framework (PDF)',
          url: 'https://pub-burnaby.escribemeetings.com/filestream.ashx?DocumentId=72013'
        }
      ]
    }
  ]
}

export function NewsPage() {

  return (
    <div className='container my-5'>

      <h1 className='text-center'>METRO VANCOUVER</h1>

      <hr />
      <div className='text-center'>
        Vancouver | Burnaby | Richmond | North Vancouver | Coquitlam | Delta
      </div>
      <hr />

      <div style={{height: 30}} />

      <div className='row'>

      <div className='col-md-6 mb-4'>
          <div className='border rounded p-4'>
            <h3 className='mb-4'>VANCOUVER</h3>
            {
              newsData.news.filter((n) => n.city === 'Vancouver').map((n) => {
                return (
                  <NewsItem title={n.title} sentiment={n.sentiment} contents={n.summary} date={n.date} links={n.links} />
                )
              })
            }
          </div>
        </div>

        <div className='col-md-6 mb-4'>
          <div className='border rounded p-4'>
            <h3 className='mb-4'>RICHMOND</h3>
            {
              newsData.news.filter((n) => n.city === 'Richmond').map((n) => {
                return (
                  <NewsItem title={n.title} sentiment={n.sentiment} contents={n.summary} date={n.date} links={n.links} />
                )
              })
            }
          </div>
        </div>

        <div className='col-md-6 mb-4'>
          <div className='border rounded p-4'>
            <h3 className='mb-4'>BURNABY</h3>
            {
              newsData.news.filter((n) => n.city === 'Burnaby').map((n) => {
                return (
                  <NewsItem title={n.title} sentiment={n.sentiment} contents={n.summary} date={n.date} links={n.links} />
                )
              })
            }
          </div>
        </div>

      </div>

      <div style={{height: 100}} />

    </div>
  )

}
