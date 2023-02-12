import express from 'express'

import { createFirm, getFirm } from '../controller/firmController.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

router.route('/createfirm').post(protect, createFirm)
router.route('/getfirm/:id').get(protect, getFirm)

export default router
