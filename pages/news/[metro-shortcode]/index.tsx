import { NextPageContext } from 'next'
import { APIService } from '@/services/APIService'
import { ICity, INewsResponse } from '@/services/Models'
import { MetroCityNews } from '@/components/News/MetroCityNews'

export const getServerSideProps = async function(ctx: NextPageContext) {
  const metroShortcodeParam = ctx.query['metro-shortcode'] as string
  const metroCityName = metroShortcodeParam ? metroShortcodeParam.replace('_', ' ') : null

  if (metroCityName) {
    try {
      const cities = await APIService.getCities(metroCityName)
      const importantNews = await APIService.getNews({
        important: 1,
        city: cities.map((c) => c.name),
        offset: 0,
        limit: 10
      })
      return {
        props: {
          cities: cities,
          importantNews: importantNews
        }
      }
    } catch (error) {
      return {
        props: {
          cities: false,
          importantNews: false
        }
      }
    }
  } else {
    return {
      props: {
        cities: false,
        importantNews: false
      }
    }
  }
}

interface IProps {
  cities: ICity[] | false
  importantNews: INewsResponse
}

export default function(props: IProps) {
  return <MetroCityNews {...props} />
}
