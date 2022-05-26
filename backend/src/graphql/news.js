import { schemaComposer } from 'graphql-compose'

import {
  NewsModel,
  NewsTC,
} from '../models/news'
// import { UserTC } from '../models/user'

export const news = NewsTC.getResolver('findMany')
export const newsId = NewsTC.getResolver('findById')
export const newsPagination = NewsTC.getResolver('pagination')

export const createNews = NewsTC.getResolver('createOne')
export const updateNewsId = NewsTC.getResolver('updateById')
export const deleteNewsId = NewsTC.getResolver('removeById')

// find News update ล่าสุด

export const UpdateNews = schemaComposer.createResolver({
  name: 'UpdateNews',
  kind: 'query',
  type: [NewsTC],
  resolve: async () => {
    const postNews = await NewsModel.find({}).sort({ _id: -1 })
    return postNews
  },
})

export const searchNews = schemaComposer.createResolver({
  name: 'searchNews',
  kind: 'query',
  type: [NewsTC],
  args: {
    keyword: 'String!',
  },
  resolve: async ({ args }) => {
    const { keyword } = args
    // query database เพื่อหา Newa ที่มี Keyword นี้อยู่ใน Title
    // Select * from News where title LIKE '%keyword%'

    const foundPosts = await NewsModel.find({ title: { $regex: keyword, $options: 'i' } }).sort({ _id: -1 })
    return foundPosts
  },
})
