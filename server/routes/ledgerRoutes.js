import express from 'express'

import { createLedger } from '../controller/ledgerController.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

router.route('/createledger').post(protect, createLedger)

export default router
