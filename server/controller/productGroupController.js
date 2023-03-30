import { ProductGroup } from '../models/ProductGroup.js'
import { Firm } from '../models/Firm.js'
import { ErrorResponse } from '../utils/errorResponse.js'

export async function addProductGroup (req, res, next) {
  const { firmId, productGroup } = req.body
  const isValid = await Firm.findById(firmId)
  if (!isValid) {
    return next(new ErrorResponse('Please provide valid firm Id', 404))
  }
  const duplicate = await ProductGroup.findOne({ firmId, productGroup })
  if (duplicate) {
    return next(new ErrorResponse('Product Group already exists!', 400))
  }
  try {
    const productGroup = new ProductGroup({ ...req.body })
    await productGroup.save()
    res.send(productGroup)
  } catch (error) {
    return next(error)
  }
}

export async function getProductGroups (req, res, next) {
  const { firmId } = req.params
  const isValid = await Firm.findById(firmId)
  if (!isValid) {
    return next(new ErrorResponse('Please provide valid firm Id', 404))
  }
  try {
    const data = await ProductGroup.find({ firmId })
    res.status(200).json({
      success: true,
      data
    })
  } catch (error) {
    next(error)
  }
}
