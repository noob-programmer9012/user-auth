import express from 'express'
import {
  addProductGroup,
  getProductGroups
} from '../controller/productGroupController.js'

const router = express.Router()

router.route('/addProductGroup').post(addProductGroup)
router.route('/getProductGroups/:firmId').get(getProductGroups)

export default router
