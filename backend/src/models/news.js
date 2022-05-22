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
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
})

NewsSchema.plugin(mongooseBcrypt)
export const NewsModel = model('News', NewsSchema)

export const NewsTC = composeWithMongoose(NewsModel)
