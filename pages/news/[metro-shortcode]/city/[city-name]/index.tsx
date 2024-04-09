import React from 'react'
import { NextPageContext } from 'next'
import { APIService } from '@/services/APIService'
import { ICity, INewsResponse } from '@/services/Models'
import { CityNews, defaultPageSize } from '@/components/News/CityNews'

export const getServerSideProps = async function(ctx: NextPageContext) {

  const cityNameParam = ctx.query['city-name'] as string

  // Get city name from URL params
  if (!cityNameParam) {
    return {
      notFound: true
    }
  }

  // Get any tag filters from URL query params
  const tag: string | null = ctx.query['tag'] as string || null

  try {
    const city = await APIService.getCity(cityNameParam)
    const news = await APIService.getNews({
      offset: 0,
      limit: defaultPageSize,
      city: cityNameParam,
      tag: tag
    })
    return {
      props: {
        city: city,
        news: news,
        tag: tag
      }
    }
  } catch (error) {
    return {
      notFound: true
    }
  }

}

interface IProps {
  city: ICity | false
  news: INewsResponse | false
  tag: string | null
}

export default function(props: IProps) {
  return <CityNews {...props} />
}
