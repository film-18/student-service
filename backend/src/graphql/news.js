import {
  NewsTC,
} from '../models/news'

export const news = NewsTC.getResolver('findMany')
export const newsId = NewsTC.getResolver('findById')
export const newsPagination = NewsTC.getResolver('pagination')

export const createNews = NewsTC.getResolver('createOne')
export const updateNewsId = NewsTC.getResolver('updateById')
export const deleteNewsId = NewsTC.getResolver('removeById')
