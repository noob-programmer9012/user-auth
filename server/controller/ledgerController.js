import { Ledger } from '../models/Ledger.js'
import { Firm } from '../models/Firm.js'
import { ErrorResponse } from '../utils/errorResponse.js'

export async function createLedger (req, res, next) {
  const {
    firmId,
    companyName,
    ledgerGroup,
    openingBalance,
    address,
    pincode,
    gst_no,
    mobile,
    email
  } = req.body

  const firm = await Firm.findById(firmId)

  if (!firm) {
    return next(new ErrorResponse('No firm found with this id.', 404))
  }

  const exist = await Ledger.findOne({ $and: [{ firmId, companyName }] })
  if (exist) {
    return next(new ErrorResponse('Company already exist.', 400))
  }

  try {
    const ledger = new Ledger({
      firmId,
      companyName,
      ledgerGroup,
      openingBalance,
      address,
      pincode,
      gst_no,
      mobile,
      email
    })
    await ledger.save()
    res.status(200).json({
      success: true,
      data: ledger
    })
  } catch (error) {
    next(error)
  }
}

export async function getDebtors (req, res, next) {
  const { firmId } = req.body

  try {
    const debtors = await Ledger.find({
      $and: [{ firmId, ledgerGroup: 'Sundry Debtors' }]
    })

    if (!debtors) {
      res.status(404).json({ success: true, data: 'No debtors are found' })
    }

    res.status(200).json({
      success: true,
      data: debtors
    })
  } catch (error) {
    next(error)
  }
}

export async function getCreditors (req, res, next) {
  const { firmId } = req.body

  try {
    const creditors = await Ledger.find({
      $and: [{ firmId, ledgerGroup: 'Sundry Creditors' }]
    })

    if (!creditors) {
      res.status(404).json({ success: true, data: 'No Creditors are found' })
    }

    res.status(200).json({
      success: true,
      data: creditors
    })
  } catch (error) {
    next(error)
  }
}
