const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment')
const bcrypt = require('bcryptjs')

const saltRounds = 12

const { Schema } = mongoose

const userSchema = new Schema({
  _id: Number,
  email: String,
  password: {
      type: String,
      select: false
  },
  role: {
      type: String,
      enum: ['seller', 'customer']
  }
}, {
  versionKey: false,
  timestamps: true
})

userSchema.plugin(autoIncrement.plugin, { 
  model: 'User',
  startAt: 1
})

userSchema.pre('save', async function (next) {
    const user = this
    const password = this.password

    if (!user.isModified('password')) return next()

    const salt = await bcrypt.genSalt(saltRounds)
    const hashedPassword = await bcrypt.hash(password, salt)

    user.password = hashedPassword

    next()
})

userSchema.methods.comparePassword = async function(password) {
    const hashedPassword = this.password

    const isPasswordCorrect = await bcrypt.compare(password, hashedPassword)

    return isPasswordCorrect
}

mongoose.model("User", userSchema)