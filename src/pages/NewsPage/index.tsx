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
        },
        {
          title: 'News',
          url: 'https://vancouver.ca/news-calendar/all-news-listing.aspx' // Best source so far
        }
      ]
    },
    {
      name: 'Richmond',
      links: [
        {
          title: 'Council meetings (2023)',
          url: 'https://citycouncil.richmond.ca/schedule/WebAgendaMinutesList.aspx?Category=6&Year=2023' // Best source so far
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
          url: 'https://pub-burnaby.escribemeetings.com/?Year=2023' // Best source so far
        },
        {
          title: 'News',
          url: 'https://www.burnaby.ca/our-city/whats-new/all-news'
        }
      ]
    }
  ],
  news: [
    {
      title: 'Funding Applications to B.C. Active Transportation Infrastructure Grants Program',
      summary: 'Council approved two funding applications for the Granville Connector - Signalized Intersections and Drake Street Upgrades, each amounting to $500,000. Council also directed staff to report back with funding mechanisms to advance the Kent Avenue corridor for safe active transportation',
      sentiment: 'positive',
      city: 'Vancouver',
      date: 'Nov 14, 2023',
      meetingType: 'council',
      links: [
        {
          title: 'Council meeting minutes (PDF)',
          url: 'https://council.vancouver.ca/20231114/documents/regu20231114min.pdf'
        },
        {
          title: 'Funding Applications to B.C. Active Transportation Infrastructure Grants Program (PDF)',
          url: 'https://council.vancouver.ca/20231114/documents/r3.pdf'
        }
      ]
    },
    {
      title: 'Industrial Modernization and Intensification Framework',
      summary: "This report addresses updates and recommendations for the Industrial Modernization and Intensification Framework in Vancouver. It outlines the city's efforts to modernize and intensify industrial lands, responding to high demand for space, low vacancy rates, and high rents. The report highlights the need for diversity in business types, especially technology companies, and suggests creating multi-level industrial buildings with non-industrial activities.",
      sentiment: 'positive',
      city: 'Vancouver',
      date: 'Nov 14, 2023',
      meetingType: 'council',
      links: [
        {
          title: 'Council meeting minutes (PDF)',
          url: 'https://council.vancouver.ca/20231114/documents/regu20231114min.pdf'
        },
        {
          title: 'Industrial Modernization and Intensification Framework – Updates and Policy Recommendations (PDF)',
          url: 'https://council.vancouver.ca/20231114/documents/r4.pdf'
        }
      ]
    },
    {
      title: 'Rezonings and development permits',
      summary: '',
      sentiment: 'neutral',
      city: 'Vancouver',
      date: 'Nov 14, 2023',
      meetingType: 'council',
      links: [
        {
          title: 'Rezoning: 4711-4787 Cambie Street (public hearing)',
          url: 'https://council.vancouver.ca/20231114/documents/rr2.pdf',
          summary: 'The report evaluates a rezoning application for 4711-4787 Cambie Street, proposing two six-storey residential buildings. It aligns with the Cambie Corridor Plan and is recommended for Public Hearing approval, subject to conditions.'
        },
        {
          title: 'Rezoning: 2231-2247 East 41st Avenue (public hearing)',
          url: 'https://council.vancouver.ca/20231114/documents/rr3.pdf',
          summary: 'The report proposes rezoning 2231-2247 East 41st Avenue from R1-1 to RR-2B for a five-storey rental building, delivering 61 units in line with the Secured Rental Policy. It recommends Public Hearing approval subject to conditions.'
        },
        {
          title: 'Rezoning: 6470 Larch Street (public hearing)',
          url: 'https://council.vancouver.ca/20231114/documents/rr4.pdf',
          summary: 'The report recommends rezoning 6470 Larch Street from R1-1 to RR-2B, allowing a five-storey rental building under the Secured Rental Policy. This would result in 33 secured rental units. Staff recommend Public Hearing approval subject to conditions'
        },
        {
          title: 'Rezoning: 1710-1730 East Pender Street (public hearing)',
          url: 'https://council.vancouver.ca/20231114/documents/rr5.pdf',
          summary: 'The report evaluates a rezoning application for 1710-1730 East Pender Street from RM-4 and RM-4N to CD-1, proposing an 18-storey building with 191 social housing units and commercial space. It aligns with the Grandview-Woodland Community Plan and Housing Vancouver Strategy, recommended for Public Hearing approval subject to conditions.'
        },
        {
          title: 'Rezoning: 8120-8168 Lord Street and 540 West 65th Avenue (public hearing)',
          url: 'https://council.vancouver.ca/20231114/documents/rr6.pdf',
          summary: 'The report evaluates a rezoning application for 8120-8168 Lord Street and 540 West 65th Avenue to CD-1 for two six-storey buildings with 146 secured-market rental units, including five below-market rentals. It aligns with the Cambie Corridor Plan and is recommended for Public Hearing approval, subject to conditions'
        },
        {
          title: 'Rezoning: 692 West 30th Avenue (public hearing)',
          url: 'https://council.vancouver.ca/20231114/documents/rr7.pdf',
          summary: 'The report proposes rezoning 692 West 30th Avenue from R1-1 to RM-8A, enabling a townhouse or rowhouse development with a maximum FSR of 1.20, potentially accommodating about ten townhouses. It aligns with the Cambie Corridor Plan and is recommended for Public Hearing approval subject to conditions​.'
        },
        {
          title: 'Rezoning: 688 West 29th Avenue (public hearing)',
          url: 'https://council.vancouver.ca/20231114/documents/rr8.pdf',
          summary: 'The report recommends rezoning 688 West 29th Avenue from R1-1 to RM-8A to facilitate a townhouse or rowhouse development with a maximum FSR of 1.20, potentially accommodating about eight townhouses. It aligns with the Cambie Corridor Plan and is recommended for Public Hearing approval subject to conditions.'
        },
        {
          title: 'Rezoning: 4330-4408 Arbutus Street and 2092 Nanton Avenue (public hearing)',
          url: 'https://council.vancouver.ca/20231114/documents/rr9.pdf',
          summary: 'The report evaluates a rezoning application for 4330-4408 Arbutus Street and 2092 Nanton Avenue to CD-1 for a senior-focused Community Care Facility. It aligns with the Vancouver Plan and Arbutus Ridge/Kerrisdale/Shaughnessy Community Vision, and is recommended for Public Hearing approval subject to conditions.'
        },
        {
          title: 'Rezoning: 848 Seymour Street (public hearing)',
          url: 'https://council.vancouver.ca/20231114/documents/rr10.pdf',
          summary: 'The report evaluates a rezoning application for 848 Seymour Street to CD-1 to permit hotel development. It aligns with the Central Business District Rezoning Policy and Metro Core Jobs and Economy Land Use Plan, recommended for Public Hearing approval subject to conditions.'
        },
        {
          title: 'Rezoning: 607-621 West 28th Avenue (approved)',
          url: 'https://council.vancouver.ca/20231114/documents/regu20231114min.pdf',
          summary: 'A By-law to amend Zoning and Development By-law No. 3575 to rezone an area from RS-1 to RM-8A regarding 607-621 West 28th Avenue (By-law No. 13854) (Councillor Zhou and Mayor Sim ineligible to vote)'
        },
        {
          title: 'Rezoning: 668-692 West 54th Avenue (approved)',
          url: 'https://council.vancouver.ca/20231114/documents/regu20231114min.pdf',
          summary: "A By-law to amend Zoning and Development By-law No. 3575 to rezone an area from RS-1 to RM-8A regarding 668-692 West 54th Avenue (By-law No. 13855) (Councillor Zhou and Mayor Sim ineligible to vote)"
        },
        {
          title: 'Rezoning: 160 West 44th Avenue (approved)',
          url: 'https://council.vancouver.ca/20231114/documents/regu20231114min.pdf',
          summary: "A By-law to amend Zoning and Development By-law No. 3575 to rezone an area from RS-1 to RM-8A regarding 160 West 44th Avenue (By-law No. 13856) (Councillor Zhou and Mayor Sim ineligible to vote)"
        },
        {
          title: 'Development: DP-2022-00325 (approved)',
          url: 'https://council.vancouver.ca/20231114/documents/regu20231114min.pdf',
          summary: "THAT the form of development for this portion of the site known as 577 West 35th Avenue (formerly 4992-5138 Ash Street) be approved generally as illustrated in the Development Application Number DP-2022-00325, prepared GBL Architects, and submitted electronically on May 3, 2023, provided that the Director of Planning may impose conditions and approve design changes which would not adversely affect either the development character of the site or adjacent properties."
        }
      ]
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
          title: 'Rezoning: Broadview CP (city applied)',
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
