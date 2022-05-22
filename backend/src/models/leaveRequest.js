import { composeWithMongoose } from 'graphql-compose-mongoose'
import { model, Schema } from 'mongoose'
import mongooseBcrypt from 'mongoose-bcrypt'

const LeaveRequestSchema = new Schema({
  type: {
    type: String,
    enum: ['c', 'personal', '-'],
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  signParent: {
    type: String,
    required: true,
  },
})

LeaveRequestSchema.plugin(mongooseBcrypt)
export const LeaveRequestModel = model('LeaveRequest', LeaveRequestSchema)

export const LeaveRequestTC = composeWithMongoose(LeaveRequestModel)
