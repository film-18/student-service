import {
  LeaveRequestTC,
} from '../models/leaveRequest'

export const leaveRequest = LeaveRequestTC.getResolver('findMany')
export const leaveRequestId = LeaveRequestTC.getResolver('findById')
export const leaveRequestPagination = LeaveRequestTC.getResolver('pagination')

export const createLeaveRequest = LeaveRequestTC.getResolver('createOne')
export const updateGeneralLeaveRequestId = LeaveRequestTC.getResolver('updateById')
export const deleteGeneralLeaveRequestId = LeaveRequestTC.getResolver('removeById')
