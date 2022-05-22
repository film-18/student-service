import {
  RequestTC,
} from '../models/request'

export const request = RequestTC.getResolver('findMany')
export const requestId = RequestTC.getResolver('findById')
export const requestPagination = RequestTC.getResolver('pagination')

export const createRequest = RequestTC.getResolver('createOne')
export const updateRequestId = RequestTC.getResolver('updateById')
export const deleteRequestId = RequestTC.getResolver('removeById')
