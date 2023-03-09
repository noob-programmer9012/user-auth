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

export async function editTransporter (req, res, next) {
  const { transporterId, firmId } = req.params
  const transporter = await Transporter.findOne({ _id: transporterId })
  if (transporter) {
    try {
      const { transporterName, gst_no } = req.body
      if (!transporterName || !gst_no) {
        return next(new ErrorResponse('Both fields are mandatory!', 400))
      }
      if (
        transporterName.toUpperCase() === transporter.transporterName &&
        gst_no.toUpperCase() === transporter.gst_no
      ) {
        return next(new ErrorResponse('No Changes were made', 400))
      }
      if (
        (await Transporter.findOne({ firmId, transporterName })) &&
        Transporter.findOne({ firmId, gst_no })
      ) {
        return next(new ErrorResponse('Duplicate Entry', 400))
      }
      transporter.transporterName = transporterName
      transporter.gst_no = gst_no
      await transporter.save()
      res.status(200).json({
        success: true,
        data: transporter
      })
    } catch (error) {
      next(error)
    }
  } else {
    return next(new ErrorResponse('No Transporter Found', 404))
  }
}

export async function deleteTransporter (req, res, next) {
  const { transporterId } = req.params
  try {
    const transporter = await Transporter.findOne({ _id: transporterId })
    if (!transporter) {
      return next(new ErrorResponse('No Transporter Found', 404))
    }
    await Transporter.deleteOne({ _id: req.params.transporterId })
    res.status(200).json({
      success: true,
      message: 'Successfully deleted transporter'
    })
  } catch (error) {
    next(error)
  }
}
