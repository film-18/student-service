import { composeWithMongoose } from 'graphql-compose-mongoose'
import { model, Schema } from 'mongoose'
import mongooseBcrypt from 'mongoose-bcrypt'

const GeneralRequestSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  teacherID: {
    type: String,
    required: true,
  },
  teacherName: {
    type: String,
    required: true,
  },
  studentIdMongo: {
    type: String,
    required: true,
  },
  studentId: {
    type: String,
    required: true,
  },
  fullname: {
    type: String,
    required: true,
  },
  program: {
    type: String,
    required: true,
  },
  major: {
    type: String,
    required: true,
  },
  degree: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  semester: {
    type: String,
    required: true,
    default: null,
  },
  school_year: {
    type: String,
    required: true,
    default: null,
  },
  description: {
    type: String,
    required: true,
    default: null,
  },
  requestDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['teacher-pending', 'staff-pending', 'dean-pending', 'approved', 'rejected', '-'],
    default: '-',
  },
  teacherComment: {
    type: String,
    default: '-',
  },
  teacherStatus: {
    type: String,
    enum: ['approved', 'rejected', '-'],
    default: '-',
  },
  teacherDate: {
    type: Date,
    default: null,
  },
  staffComment: {
    type: String,
    default: '-',
  },
  staffStatus: {
    type: String,
    enum: ['approved', 'rejected', '-'],
    default: '-',
  },
  staffDate: {
    type: Date,
    default: null,
  },
  deanComment: {
    type: String,
    default: '-',
  },
  deanStatus: {
    type: String,
    enum: ['approved', 'rejected', '-'],
    default: '-',
  },
  deanDate: {
    type: Date,
    default: null,
  },
}, {
  timestamps: true,
})

GeneralRequestSchema.plugin(mongooseBcrypt)

export const GeneralRequestModel = model('GeneralRequest', GeneralRequestSchema)

export const GeneralRequestTC = composeWithMongoose(GeneralRequestModel)
