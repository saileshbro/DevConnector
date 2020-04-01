const mongoose = require('mongoose')
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    })
    console.log('MongoDB Connected...')
  } catch (error) {
    console.error(error.message)
    // Exit process with failure
    process.exit(1)
  }
}
// inport all the models to be registered
require('../models/User')
require('../models/Profile')
module.exports = connectDB
