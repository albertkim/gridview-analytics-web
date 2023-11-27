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
    },
    {
      title: 'Rezonings, and development permits',
      summary: '',
      sentiment: 'neutral',
      city: 'Burnaby',
      date: 'Nov 20, 2023',
      meetingType: 'council',
      links: [
        {
          title: 'Rezoning: REZ #20-17 (revision)',
          url: 'https://pub-burnaby.escribemeetings.com/filestream.ashx?DocumentId=72014',
          summary: 'The document is a public hearing report for a revised rezoning proposal (REZ #20-17) for a portion of 6229 Marine Drive, focused on non-market housing development as part of the Edmonds Town Centre Plan. It details seeking Council authorization for a new proposed bylaw and amendments to facilitate development of affordable housing units with varying levels of affordability.'
        },
        {
          title: 'Rezoning: PROPOSED DENSITY TRANSFER AND REDEVELOPMENT - BROADVIEW CP (applied)',
          url: 'https://pub-burnaby.escribemeetings.com/filestream.ashx?DocumentId=72004',
          summary: 'Details a plan to rezone and redevelop properties on both sides of Canada Way in Burnaby. The proposal involves transferring density between these sites to facilitate mixed-use, multi-family development with commercial uses at grade, aligning with Broadview Community Plan guidelines. The plan by AviSina Properties includes full underground parking, with heights up to 12 storeys for certain phases. No financial implications are noted, and the proposal aims to provide a significant amount of rental housing efficiently.'
        },
        {
          title: 'Rezoning: REZ #18-23 (revision)',
          url: 'https://pub-burnaby.escribemeetings.com/filestream.ashx?DocumentId=72007',
          summary: "The document is a proposal for a swing site for interim rental housing at 6616 and 6638 Telford Avenue, seeking authorization for Belford Properties to work with the city on this project. It involves amending a Phased Development Agreement and a rezoning amendment bylaw. The site will provide 220 rental units, with additional units rented at market rates or below CMHC median rates, to accommodate tenants displaced by redevelopment in Burnaby's Maywood neighborhood."
        },
        {
          title: 'Rezoning: REZ #21-22 (approved)',
          url: 'https://pub-burnaby.escribemeetings.com/filestream.ashx?DocumentId=72036',
          summary: 'Purpose: to permit the construction of a mixed tenure high-rise apartment building with street-fronting live/work townhouses along Douglas Street'
        }
      ]
    },
    {
      title: 'Burnaby Consolidated Fees and Charges Bylaw - Additional Amendments for 2023',
      summary: 'The document details proposed adjustments to various fees in Burnaby for 2024, including changes to local improvement, sewer connection, and bylaw fees, plus a revision of golf fees, all effective from January 1, 2024.',
      sentiment: 'neutral',
      city: 'Burnaby',
      date: 'Nov 20, 2023',
      meetingType: 'council',
      links: [
        {
          title: 'Burnaby Consolidated Fees and Charges Bylaw - Additional Amendments for 2023',
          url: 'https://pub-burnaby.escribemeetings.com/filestream.ashx?DocumentId=72017'
        }
      ]
    },
    {
      title: 'Burnaby Rent Bank Funding Request',
      summary: "The Burnaby Rent Bank requests $135,000 from the Operating Housing Reserve over three years for administrative costs. Operated by the Purpose Society since 2020, it offers no-interest loans and grants to low-income renters in Burnaby, preventing homelessness. Increased demand necessitates additional staffing. The program supports the Mayor's Task Force on Community Housing's homelessness prevention goals.",
      sentiment: 'positive',
      city: 'Burnaby',
      date: 'Nov 20, 2023',
      meetingType: 'council',
      links: [
        {
          title: 'Council meeting (with video)',
          url: 'https://pub-burnaby.escribemeetings.com/Meeting.aspx?Id=d2a93368-043a-48c6-8fa6-dc0cbf0b10ea&Agenda=Agenda&lang=English&Item=41&Tab=attachments'
        },
        {
          title: 'Burnaby Rent Bank Funding Request (PDF)',
          url: 'https://pub-burnaby.escribemeetings.com/filestream.ashx?DocumentId=71992'
        }
      ]
    },
    {
      title: '2024 - 2028 Financial Plan Highlights',
      summary: 'The 2024-2028 Financial Plan Highlights for Burnaby include a $674 million operating plan with a 4.5% property tax increase and key investments in community safety and services, and a $365.3 million capital plan focusing on major projects like community centers and infrastructure.',
      sentiment: 'neutral',
      city: 'Burnaby',
      date: 'Nov 20, 2023',
      meetingType: 'council',
      links: [
        {
          title: 'Council meeting (with video)',
          url: 'https://pub-burnaby.escribemeetings.com/Meeting.aspx?Id=d2a93368-043a-48c6-8fa6-dc0cbf0b10ea&Agenda=Agenda&lang=English&Item=65&Tab=attachments'
        },
        {
          title: '2024 - 2028 Financial Plan Highlights (PDF)',
          url: 'https://pub-burnaby.escribemeetings.com/filestream.ashx?DocumentId=72029'
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
