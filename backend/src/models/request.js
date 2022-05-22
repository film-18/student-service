import { composeWithMongoose } from 'graphql-compose-mongoose'
import { model, Schema } from 'mongoose'
import mongooseBcrypt from 'mongoose-bcrypt'

const RequestSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  typeRequest: {
    type: String,
    enum: ['General-Request', 'Leave-Request'],
    default: 'General-Request',
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
  file: {
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
  signName: {
    type: String,
    default: null,
  },
}, {
  timestamps: true,
})
RequestSchema.plugin(mongooseBcrypt)

export const RequestModel = model('Request', RequestSchema)

export const RequestTC = composeWithMongoose(RequestModel)
