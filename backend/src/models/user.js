import { composeWithMongoose } from 'graphql-compose-mongoose'
import { model, Schema } from 'mongoose'
import mongooseBcrypt from 'mongoose-bcrypt'

const UserSchema = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    index: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    bcrypt: true,
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    default: null,
  },
  telephone: {
    type: String,
    required: true,
    default: null,
  },
  year: {
    type: String,
  },
  role: {
    type: String,
    enum: ['student', 'teacher', 'staff', 'dean'],
    default: 'student',
  },
  degree: {
    type: String,
    enum: ['Bachelor', 'Master', 'Doctor', '-'],
    default: '-',
  },
  program: {
    type: String,
    enum: ['Information Technology', 'Data Science and Business Analytics', 'Business Information Technology (International Program)', '-'],
    default: '-',
  },
  major: {
    type: String,
    enum: ['Software Engineering', 'Network and System Technology', 'Multimedia and Game Development', '-'],
    default: '-',
  },
})

UserSchema.plugin(mongooseBcrypt)

export const UserModel = model('User', UserSchema)
export const UserTC = composeWithMongoose(UserModel)
