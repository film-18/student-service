import { composeWithMongoose } from 'graphql-compose-mongoose'
import { model, Schema } from 'mongoose'
import mongooseBcrypt from 'mongoose-bcrypt'

const LeaveRequestSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  leaveType: {
    type: String,
    enum: ['Sick', 'Business'],
    required: true,
  },
  studentId: {
    type: String,
    required: true,
  },
  semester: {
    type: String,
    required: true,
    default: null,
  },
  description: {
    type: String,
    required: true,
    default: null,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  parent: {
    type: String,
    default: '',
  },
  status: {
    type: String,
    enum: ['teacher-pending', 'approved', 'rejected', '-'],
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
  subjectId: {
    type: String,
    required: true,
  },
  subjectName: {
    type: String,
    required: true,
  },
  teacherId: {
    type: String,
    required: true,
  },
  file: {
    type: String,
    default: '-',
  },
}, {
  timestamps: true,
})

LeaveRequestSchema.plugin(mongooseBcrypt)
export const LeaveRequestModel = model('LeaveRequest', LeaveRequestSchema)

export const LeaveRequestTC = composeWithMongoose(LeaveRequestModel)
