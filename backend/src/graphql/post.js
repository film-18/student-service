// import { schemaComposer } from 'graphql-compose'

import {
  PostTC,
} from '../models/post'

export const posts = PostTC.getResolver('findMany')
export const postId = PostTC.getResolver('findById')
export const postPagination = PostTC.getResolver('pagination')

export const createPost = PostTC.getResolver('createOne')
export const updatePostId = PostTC.getResolver('updateById')
export const deletePostId = PostTC.getResolver('removeById')

// PostTC.addRelation(
//     'author', {
//         resolver: UserTC.getResolver('findById'),
//         projection: {
//             authorId: 1
//         },
//         prepareArgs: {
//             _id: (post) => post.authorId,
//         },
//     },
// )
