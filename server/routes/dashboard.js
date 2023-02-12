import express from 'express'

import { protect } from '../middleware/auth.js'

const router = express.Router()

router.route('/').get(protect, async (req, res, next) => {
  res.status(200).json({
    success: true,
    data: req.user
  })
})

export default router
