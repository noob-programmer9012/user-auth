import express from 'express'

import { protect } from '../middleware/auth.js'
import {
  addtransporter,
  gettransporters
} from '../controller/transporterController.js'

const router = express.Router()

router.route('/addtransporter').post(protect, addtransporter)
router.route('/gettransporters/:firmId').get(protect, gettransporters)

export default router
