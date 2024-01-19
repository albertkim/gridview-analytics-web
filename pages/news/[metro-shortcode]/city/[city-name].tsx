import React from 'react'
import { NextPageContext } from 'next'
import { APIService } from '@/services/APIService'
import { ICity, INewsResponse } from '@/services/Models'
import { CityNews, defaultPageSize } from '@/components/News/CityNews'

export const getServerSideProps = async function(ctx: NextPageContext) {

  const cityNameParam = ctx.query['city-name'] as string

  if (!cityNameParam) {
    return {
      notFound: true
    }
  }

  try {
    const city = await APIService.getCity(cityNameParam)
    const news = await APIService.getNews({
      offset: 0,
      limit: defaultPageSize,
      city: cityNameParam
    })
    return {
      props: {
        city: city,
        news: news
      }
    }
  } catch (error) {
    return {
      notFound: true
    }
  }

}

interface IProps {
  city: ICity | false,
  news: INewsResponse | false
}

export default function(props: IProps) {
  return <CityNews {...props} />
}
