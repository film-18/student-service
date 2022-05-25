import { composeWithMongoose } from 'graphql-compose-mongoose'
import { model, Schema } from 'mongoose'
import mongooseBcrypt from 'mongoose-bcrypt'

const TeacherList = {
  teacherName: {
    type: String,
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
  teacherID: {
    type: String,
    required: true,
  },
}

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
    enum: ['teacher_pending', 'approved', 'rejected', '-'],
    default: '-',
  },
  teacherName: {
    type: String,
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
  },
  subjectName: {
    type: String,
  },
  teacherID: {
    type: String,
  },
  file: {
    type: [String],
    default: '-',
  },
  teacherList: {
    type: [TeacherList],
  },
}, {
  timestamps: true,
})

LeaveRequestSchema.plugin(mongooseBcrypt)
export const LeaveRequestModel = model('LeaveRequest', LeaveRequestSchema)

export const LeaveRequestTC = composeWithMongoose(LeaveRequestModel)
