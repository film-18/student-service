import { GraphQLUpload } from 'apollo-upload-server'
import { schemaComposer } from 'graphql-compose'

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

const minio = require('minio')

const minClient = new minio.Client({
  endPoint: process.env.AWS_ENDPOINT,
  useSSL: process.env.AWS_ENDPOINT_SSL === 'true',
  accessKey: process.env.BUCKET_ACCESS_KEY,
  secretKey: process.env.BUCKET_SECRET_KEY,
})

schemaComposer.set('Upload', GraphQLUpload)

export const UploadLeaveRequestFile = schemaComposer.createResolver({
  name: 'UploadLeaveRequestFile',
  kind: 'mutation',
  type: 'String',
  args: {
    document: 'Upload',
  },
  resolve: async ({ args }) => {
    const { document } = args
    const {
      filename, createReadStream,
    } = await document

    // const ext = /(?:\.([^.]+))?$/.exec(filename)

    const stream = createReadStream()

    const uploadedName = `${(Math.random() + 1).toString(36).substring(2)}_${new Date().valueOf()}_${filename}`

    await minClient.putObject(
      process.env.AWS_BUCKET_NAME,
      uploadedName,
      stream,
    )

    return uploadedName
  },
})
