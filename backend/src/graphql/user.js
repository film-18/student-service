// import { UserInputError } from 'apollo-server-core'
import { UserInputError } from 'apollo-server-core'
import { schemaComposer } from 'graphql-compose'

import { generateUserToken } from '../lib/generateUserToken'
import { GeneralRequestTC } from '../models/generalRequest'
import { LeaveRequestTC } from '../models/leaveRequest'
import { NewsTC } from '../models/news'
import { UserModel, UserTC } from '../models/user'

export const users = UserTC.getResolver('findMany')
export const userId = UserTC.getResolver('findById')

export const me = schemaComposer.createResolver({
  name: 'me',
  kind: 'query',
  type: UserTC.getType(),
  resolve: async ({ context }) => {
    const { userId: _id } = context
    if (!_id) {
      throw new UserInputError('User ID not found in token')
    }
    const user = await UserModel.findById(_id)
    return user
  },
})
export const createUser = UserTC.getResolver('createOne')
const LoginPayloadOTC = schemaComposer.createObjectTC({
  name: 'LoginPayload',
  fields: {
    status: 'String!',
    message: 'String',
    token: 'String',
  },
})
export const login = schemaComposer.createResolver({
  name: 'login',
  kind: 'mutation',
  type: LoginPayloadOTC,
  args: {
    username: 'String!',
    password: 'String!',
  },
  resolve: async ({ args }) => {
    const { username, password } = args
    const user = await UserModel.findOne({ username: username.toLowerCase() })
    if (!user) {
      // throw new UserInputError('Username not found')
      return {
        status: 'failed',
        message: 'Username not found',
        token: null,
      }
    }
    const validPassword = await user.verifyPassword(password)
    if (!validPassword) {
      // throw new AuthenticationError('Password incorrect')
      return {
        status: 'failed',
        message: 'Password incorrect',
        token: null,
      }
    }
    const token = generateUserToken(user)
    return {
      status: 'success',
      message: 'Login success',
      token,
    }
  },
})

// UserTC.addRelation(
//   'posts',
//   {
//     resolver: PostTC.getResolver('findMany'),
//     projection: { _id: 1 },
//     prepareArgs: {
//       filter: (user) => ({
//         authorId: user._id,
//       }),
//     },
//   },
// )
UserTC.addFields({
  fullname: {
    type: 'String',
    projection: { firstname: 1, lastname: 1 },
    resolve: (user) => `${user.firstname} ${user.lastname}`,
  },
})

// user and generalRequest

UserTC.addRelation('RequestedGeneral', {
  resolver: GeneralRequestTC.getResolver('findMany'),
  projection: {
    _id: 1,
  },
  prepareArgs: {
    filter: (user) => ({
      studentIdMongo: user._id,
    }),
  },
})

UserTC.addRelation('DoRequestGeneral', {
  resolver: GeneralRequestTC.getResolver('findMany'),
  projection: {
    _id: 1,
  },
  prepareArgs: {
    filter: (user) => ({
      teacherID: user._id,
    }),
  },
})

// user and leaveRequest

UserTC.addRelation('RequestedLeave', {
  resolver: LeaveRequestTC.getResolver('findMany'),
  projection: {
    _id: 1,
  },
  prepareArgs: {
    filter: (user) => ({
      studentIdMongo: user._id,
    }),
  },
})

UserTC.addRelation('DoRequestLeave', {
  resolver: LeaveRequestTC.getResolver('findMany'),
  projection: {
    _id: 1,
  },
  prepareArgs: {
    filter: (user) => ({
      teacherID: user._id,
    }),
  },
})

// user and News
UserTC.addRelation('RequestedLeave', {
  resolver: NewsTC.getResolver('findMany'),
  projection: {
    _id: 1,
  },
  prepareArgs: {
    filter: (user) => ({
      staffID: user._id,
    }),
  },
})
