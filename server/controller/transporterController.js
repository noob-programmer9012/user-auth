import { Firm } from '../models/Firm.js'
import { Transporter } from '../models/Transporters.js'
import { ErrorResponse } from '../utils/errorResponse.js'

export const addtransporter = async (req, res, next) => {
  const { firmId, transporterName, gst_no } = req.body

  const isValid = await Firm.findById(firmId)
  if (!isValid) {
    return next(new ErrorResponse('No firm registered with this user Id', 404))
  }

  const duplicate = await Transporter.findOne({
    $and: [{ firmId, transporterName }]
  })

  if (duplicate) {
    return next(new ErrorResponse('This transporter already exists', 400))
  }

  try {
    const data = new Transporter({ firmId, transporterName, gst_no })
    await data.save()
    return res.status(201).json({
      success: true,
      data
    })
  } catch (error) {
    next(error)
  }
}

export const gettransporters = async (req, res, next) => {
  const { firmId } = req.params
  const isValid = await Firm.findById(firmId)
  if (!isValid) {
    next(new ErrorResponse('No firm registered with this user Id', 404))
  }

  try {
    const data = await Transporter.find({ firmId })
    res.status(200).json({
      success: true,
      data
    })
  } catch (error) {
    next(error)
  }
}
