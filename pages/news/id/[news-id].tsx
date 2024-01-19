import { NextPageContext } from 'next'
import { APIService } from '@/services/APIService'
import { ICity, INews } from '@/services/Models'
import { NewsItem } from '@/components/News/NewsItem'

export const getServerSideProps = async function(ctx: NextPageContext) {

  const newsIdParam = ctx.query['news-id'] as string
  const newsId = parseInt(newsIdParam)

  if (!newsId) {
    return {
      notFound: true
    }
  }

  try {
    const news = await APIService.getNewsById(newsId)
    const city = await APIService.getCity(news.cityName)
    return {
      props: {
        news: news,
        city: city
      }
    }
  } catch (error) {
    return {
      notFound: true
    }
  }

}

interface IProps {
  city: ICity
  news: INews
}

export default function(props: IProps) {
  return <NewsItem {...props} />
}
