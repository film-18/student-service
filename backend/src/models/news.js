import { composeWithMongoose } from 'graphql-compose-mongoose'
import { model, Schema } from 'mongoose'
import mongooseBcrypt from 'mongoose-bcrypt'

const NewsSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  shortDes: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  startDate: {
    type: Date,
    default: null,
  },
  endDate: {
    type: Date,
    default: null,
  },
  staffID: {
    type: String,
    required: true,
  },
})

NewsSchema.plugin(mongooseBcrypt)
export const NewsModel = model('News', NewsSchema)

export const NewsTC = composeWithMongoose(NewsModel)
