import express from 'express'

import { protect } from '../middleware/auth.js'
import {
  addtransporter,
  gettransporters,
  editTransporter,
  deleteTransporter
} from '../controller/transporterController.js'

const router = express.Router()

router.route('/addtransporter').post(protect, addtransporter)
router.route('/gettransporters/:firmId').get(protect, gettransporters)
router.route('/edit/:transporterId/:firmId').put(protect, editTransporter)
router.route('/delete/:transporterId').delete(protect, deleteTransporter)

export default router
