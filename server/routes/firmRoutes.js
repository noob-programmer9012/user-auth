import express from 'express'

import { createFirm, getFirm, yearEnd } from '../controller/firmController.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

router.route('/createfirm').post(protect, createFirm);
router.route('/getfirm/:id').get(protect, getFirm);

router.route('/yearend/:firmId').put(protect, yearEnd);

export default router
