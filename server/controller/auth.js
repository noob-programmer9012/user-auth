import crypto from 'crypto'
import { User } from '../models/User.js'
import { ErrorResponse } from '../utils/errorResponse.js'
import sendEmail from '../utils/sendEmail.js'

async function registerUser(req, res, next) {
  try {
    const { username, email, password } = req.body
    const user = new User({ username, email, password })
    await user.save()
    sendToken(user, 201, res)
  } catch (error) {
    next(error)
  }
}

async function loginUser(req, res, next) {
  const { email, password } = req.body

  try {
    if (!email || !password) {
      return next(new ErrorResponse('Please provide email and password', 400))
    }
    const user = await User.findOne({ email }).select('+password')
    if (!user) {
      return next(
        new ErrorResponse('Please provide correct email and password', 404)
      )
    }

    const matchPassword = await user.matchPassword(password)
    if (!matchPassword) {
      return next(
        new ErrorResponse('Please provide correct email and password', 404)
      )
    }
    sendToken(user, 200, res)
  } catch (error) {
    next(error)
  }
}

async function forgotPassword(req, res, next) {
  const { email } = req.body

  try {
    const user = await User.findOne({ email })
    if (!user) {
      return next(
        new ErrorResponse('Could not find user by email address', 404)
      )
    }
    const resetToken = await user.sendResetToken()
    await user.save()

    // Send Email
    try {
      const url = `https://www.the-erp.in/resetpassword/${resetToken}`
      const message = `
                <h1>Reset Password Link</h1>
                <p>Please, visit the following link to reset your password:</p>
                <a href=${url} clicktracking=off>${url}</a>
            `
      await sendEmail({
        to: user.email,
        subject: 'Reset Password Link',
        html: message
      })

      res.status(200).json({
        success: true,
        message: 'Email sent successfully!'
      })
    } catch (error) {
      user.resetPasswordToken = undefined
      user.resetPasswordTokenExpire = undefined
      await user.save()
      console.log(user)
      return next(new ErrorResponse('Could not sent email', 500))
    }
  } catch (error) {
    next(error)
  }
}

async function resetPassword(req, res, next) {
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.resetToken)
    .digest('hex')
  try {
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordTokenExpire: { $gt: Date.now() }
    })
    if (!user) {
      return next(new ErrorResponse('Invalid reset token', 400))
    }

    user.password = req.body.password
    user.resetPasswordToken = undefined
    user.resetPasswordTokenExpire = undefined
    await user.save()
    res.status(201).json({
      success: true,
      message: 'Password Changed Successfully.'
    })
  } catch (error) {
    next(error)
  }
}

async function sendToken(user, statusCode, res) {
  const token = await user.sendSignedToken()
  res.status(statusCode).json({
    status: true,
    token
  })
}

export { registerUser, loginUser, forgotPassword, resetPassword }
