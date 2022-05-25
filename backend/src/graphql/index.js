import { schemaComposer } from 'graphql-compose'

import * as generalRequests from './generalRequest'
import * as leaveRequest from './leaveRequest'
// import * as posts from './post'
import * as news from './news'
// import * as requests from './request'
import * as users from './user'

schemaComposer.Query.addFields({
//   posts: posts.posts,
//   postId: posts.postId,
//   postPagination: posts.postPagination,
  me: users.me,
  users: users.users,
  userId: users.userId,

  // request: requests.request,
  // requestId: requests.requestId,
  // requestPagination: requests.requestPagination,

  generalRequest: generalRequests.generalRequest,
  generalRequestId: generalRequests.generalRequestId,
  generalRequestPagination: generalRequests.generalRequestPagination,

  leaveRequest: leaveRequest.leaveRequest,
  leaveRequestId: leaveRequest.leaveRequestId,
  leaveRequestPagination: leaveRequest.leaveRequestPagination,

  news: news.news,
  newsId: news.newsId,
  newsPagination: news.newsPagination,
  UpdateNews: news.UpdateNews,
  searchNews: news.searchNews,

})
schemaComposer.Mutation.addFields({
//   createPost: posts.createPost,
//   updatePostId: posts.updatePostId,
//   deletePostId: posts.deletePostId,

  createUser: users.createUser,
  login: users.login,
  updateuserId: users.updateuserId,

  // createRequest: requests.createRequest,
  // updateRequestId: requests.updateRequestId,
  // deleteRequestId: requests.deleteRequestId,

  createGeneralRequest: generalRequests.createGeneralRequest,
  updateGeneralRequestId: generalRequests.updateGeneralRequestId,
  deleteGeneralRequestId: generalRequests.deleteGeneralRequestId,

  createLeaveRequest: leaveRequest.createLeaveRequest,
  updateGeneralLeaveRequestId: leaveRequest.updateGeneralLeaveRequestId,
  deleteGeneralLeaveRequestId: leaveRequest.deleteGeneralLeaveRequestId,
  UploadLeaveRequestFile: leaveRequest.UploadLeaveRequestFile,

  createNews: news.createNews,
  updateNewsId: news.updateNewsId,
  deleteNewsId: news.deleteNewsId,

})

const schema = schemaComposer.buildSchema()

export default schema
