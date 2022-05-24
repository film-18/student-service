import {
  LeaveRequestTC,
} from '../models/leaveRequest'
import { UserTC } from '../models/user'

export const leaveRequest = LeaveRequestTC.getResolver('findMany')
export const leaveRequestId = LeaveRequestTC.getResolver('findById')
export const leaveRequestPagination = LeaveRequestTC.getResolver('pagination')

export const createLeaveRequest = LeaveRequestTC.getResolver('createOne')
export const updateGeneralLeaveRequestId = LeaveRequestTC.getResolver('updateById')
export const deleteGeneralLeaveRequestId = LeaveRequestTC.getResolver('removeById')

// leave request sent by student

LeaveRequestTC.addRelation('LeaveListStudent', {
  resolver: UserTC.getResolver('findById'),
  projection: {
    studentIdMongo: 1, // เอามาจากฝั่งตัวเอง
  },
  prepareArgs: {
    _id: (req) => req.studentIdMongo, // ฝั่งตรงข้าม => ฝั่งตัวเอง
  },
})

// leave request sent to teacher

LeaveRequestTC.addRelation('LeaveListStudentTeacher', {
  resolver: UserTC.getResolver('findById'),
  projection: {
    teacherID: 1, // เอามาจากฝั่งตัวเอง
  },
  prepareArgs: {
    _id: (req) => req.teacherID, // ฝั่งตรงข้าม => ฝั่งตัวเอง
  },
})
