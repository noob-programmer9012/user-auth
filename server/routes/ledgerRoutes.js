import express from 'express'

import {
  createLedger,
  getDebtors,
  getCreditors
} from '../controller/ledgerController.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

router.route('/createledger').post(protect, createLedger)
router.route('/getdebtors').get(protect, getDebtors)
router.route('/getcreditors').get(protect, getCreditors)

export default router
