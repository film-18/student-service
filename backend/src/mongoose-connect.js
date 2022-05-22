import mongoose from 'mongoose'

const uri = 'mongodb+srv://cluster0.yrd58.mongodb.net/?retryWrites=true&w=majority'
const options = {
  dbName: 'student-service',
  user: 'studentService',
  pass: 'project',
}

export default mongoose.connect(uri, options)

