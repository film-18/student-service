import { composeWithMongoose } from 'graphql-compose-mongoose'
import { model, Schema } from 'mongoose'
import mongooseBcrypt from 'mongoose-bcrypt'

const NotificationSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  studentId: {
    type: String,
    required: true,
  },
  teacherId: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
})

NotificationSchema.plugin(mongooseBcrypt)

export const NotificationModel = model('Notification', NotificationSchema)

export const NotificationTC = composeWithMongoose(NotificationModel)
