import { composeWithMongoose } from 'graphql-compose-mongoose'
import { model, Schema } from 'mongoose'
import mongooseBcrypt from 'mongoose-bcrypt'

const GeneralRequestSchema = new Schema({
  teacherComment: {
    type: String,
    enum: ['approved', 'rejected', '-'],
    default: '-',
    required: true,
  },
  teacherDate: {
    type: Date,
    default: null,
  },
  staffComment: {
    type: String,
    enum: ['approved', 'rejected', '-'],
    default: '-',
    required: true,
  },
  staffDate: {
    type: Date,
    default: null,
  },
  deanComment: {
    type: String,
    enum: ['approved', 'rejected', '-'],
    default: '-',
    required: true,
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
