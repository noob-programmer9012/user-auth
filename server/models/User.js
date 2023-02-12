import mongoose from 'mongoose'
import bcryptjs from 'bcryptjs'
import pkg from 'jsonwebtoken'
import crypto from 'crypto'

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please enter an Username'],
    minlength: 8,
    maxlength: 15,
    unique: true
  },
  email: {
    type: String,
    required: [true, 'Please enter an email address'],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please enter an valid email address'
    ],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    select: false,
    minlength: 6
  },
  firm: {
    type: mongoose.Schema.ObjectId
  },
  resetPasswordToken: String,
  resetPasswordTokenExpire: Date
})

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }
  const salt = await bcryptjs.genSalt(10)
  this.password = await bcryptjs.hash(this.password, salt)
  next()
})

UserSchema.methods.matchPassword = async function matchPassword (password) {
  return await bcryptjs.compare(password, this.password)
}

UserSchema.methods.sendSignedToken = function () {
  const token = pkg.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  })
  return token
}

UserSchema.methods.sendResetToken = function () {
  const token = crypto.randomBytes(20).toString('hex')
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(token)
    .digest('hex')
  this.resetPasswordTokenExpire = Date.now() + 10 * (1000 * 60)
  return token
}

const User = mongoose.model('user', UserSchema)

export { User }
