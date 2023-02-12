import { User } from '../models/User.js'
import { Firm } from '../models/Firm.js'
import { ErrorResponse } from '../utils/errorResponse.js'

async function createFirm (req, res, next) {
  const { user_id, company_name, address, mobile, gst_no } = req.body

  try {
    const user = await User.findById(user_id)
    if (!user) {
      next(new ErrorResponse('No user associated with this id', 404))
    }
    const firm = new Firm({
      userId: user_id,
      companyName: company_name,
      address,
      mobile,
      gst_no
    })
    await firm.save()
    user.firm = firm._id
    await user.save()
    res.json({
      success: true,
      data: user
    })
  } catch (error) {
    next(error)
  }
}

async function getFirm (req, res, next) {
  try {
    const firm = await Firm.findOne({ userId: req.params.id })
    if (!firm) {
      return next(new ErrorResponse('No firm associated with this user.'))
    }
    res.json({
      success: true,
      data: firm
    })
  } catch (error) {
    return next(error)
  }
}

export { createFirm, getFirm }
