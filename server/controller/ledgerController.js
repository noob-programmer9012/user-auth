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
    next(new ErrorResponse('No firm found with this id.', 404))
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
