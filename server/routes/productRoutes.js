import express from 'express'

import { protect } from '../middleware/auth.js'
import {
  addProduct,
  deleteProduct,
  editProduct,
  getProduct,
  getProducts
} from '../controller/productController.js'

const router = express.Router()

router.route('/addProduct').post(protect, addProduct)
router.route('/getProducts').get(protect, getProducts)
router.route('/getProduct/:productId').get(protect, getProduct)
router.route('/editProduct/:productId').put(protect, editProduct)
router.route('/deleteProduct/:productId').delete(protect, deleteProduct)

export default router
