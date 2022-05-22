import {
  GeneralRequestTC,
} from '../models/generalRequest'

export const generalRequest = GeneralRequestTC.getResolver('findMany')
export const generalRequestId = GeneralRequestTC.getResolver('findById')
export const generalRequestPagination = GeneralRequestTC.getResolver('pagination')

export const createGeneralRequest = GeneralRequestTC.getResolver('createOne')
export const updateGeneralRequestId = GeneralRequestTC.getResolver('updateById')
export const deleteGeneralRequestId = GeneralRequestTC.getResolver('removeById')
