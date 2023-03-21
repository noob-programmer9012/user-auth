import { Product } from '../models/Product.js'
import { Firm } from '../models/Firm.js'
import { ErrorResponse } from '../utils/errorResponse.js'
import { titleCase } from '../utils/titleCase.js'

export async function addProduct (req, res, next) {
  const { firmId, productName } = req.body

  const firm = await Firm.findById(firmId)
  if (!firm) {
    return next(new ErrorResponse('No firm is registerd with this id', 404))
  }

  const product = await Product.findOne({
    firmId,
    productName: titleCase(productName)
  })
  if (product) {
    return next(new ErrorResponse('This product is already registered', 400))
  }

  try {
    const data = new Product({ ...req.body })
    await data.save()
    res.status(201).json({
      success: true,
      data
    })
  } catch (error) {
    return next(error)
  }
}

export async function getProducts (req, res, next) {
  const { firmId } = req.params
  const productsPerPage = req.query.productsPerPage
    ? parseInt(req.query.productsPerPage)
    : 5
  const page = req.query.page ? parseInt(req.query.page) : 0
  try {
    const totalProducts = await Product.where({ firmId }).countDocuments()
    const products = await Product.find({ firmId })
      .limit(productsPerPage)
      .skip(productsPerPage * page)
      .sort({ productName: 1 })
    res.status(200).json({
      success: true,
      productsPerPage,
      page,
      totalProducts,
      products
    })
  } catch (error) {
    return next(error)
  }
}

export async function getProduct (req, res, next) {
  res.send('Get Product Route')
}

export async function editProduct (req, res, next) {
  res.send('Edit Product Route')
}

export async function deleteProduct (req, res, next) {
  res.send('Delet Product Route')
}
