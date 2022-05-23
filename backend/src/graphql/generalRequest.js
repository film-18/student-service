import {
  GeneralRequestTC,
} from '../models/generalRequest'
import { UserTC } from '../models/user'

export const generalRequest = GeneralRequestTC.getResolver('findMany')
export const generalRequestId = GeneralRequestTC.getResolver('findById')
export const generalRequestPagination = GeneralRequestTC.getResolver('pagination')

export const createGeneralRequest = GeneralRequestTC.getResolver('createOne')
export const updateGeneralRequestId = GeneralRequestTC.getResolver('updateById')
export const deleteGeneralRequestId = GeneralRequestTC.getResolver('removeById')

// general request sent by student

GeneralRequestTC.addRelation('GeneralListStudent', {
  resolver: UserTC.getResolver('findById'),
  projection: {
    studentID: 1, // เอามาจากฝั่งตัวเอง
  },
  prepareArgs: {
    _id: (req) => req.studentID, // ฝั่งตรงข้าม => ฝั่งตัวเอง
  },
})

// general request sent to teacher

GeneralRequestTC.addRelation('GeneralListStudentTeacher', {
  resolver: UserTC.getResolver('findById'),
  projection: {
    teacherID: 1, // เอามาจากฝั่งตัวเอง
  },
  prepareArgs: {
    _id: (req) => req.teacherID, // ฝั่งตรงข้าม => ฝั่งตัวเอง
  },
})

