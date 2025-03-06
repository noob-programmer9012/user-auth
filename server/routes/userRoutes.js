import express from 'express'

import {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword
} from '../controller/auth.js'

const router = express.Router()

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/forgotpassword').post(forgotPassword)
router.route('/resetpassword/:resetToken').put(resetPassword)

export default router
