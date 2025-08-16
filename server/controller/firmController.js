import { User } from '../models/User.js';
import { Firm } from '../models/Firm.js';
import { Ledger } from '../models/Ledger.js';
import Debit from '../models/Debit.js';
import Credit from '../models/Credit.js';
import { ErrorResponse } from '../utils/errorResponse.js';

/* 
to make a year ends;
send a put request with firm ID
then get all the ledger ids associated with that firm ID and store them in an array
now iterate over the array and get all the debit entries for that id and get final debit amount within current finanancial year
now do the same for credit entries
get the remaining balance from debit and credit and update the ledger opening balance
*/

async function yearEnd(req, res, next) {
  const firmId = req.params.firmId;

  try {
    const firm = await Firm.findById(firmId);

    if (!firm) {
      return next(new ErrorResponse('No firm associated with this user.'));
    }

    let fYearStart = firm.fYearStart;
    let fYearEnd = firm.fYearEnd;

    const ledgers = await Ledger.find({ firmId }, { _id: 1 });

    // const date = new Date();

    for (let ledger of ledgers) {
      const ledgerId = ledger._id;

      // also get only entries for current financial year
      const debits = await Debit.find({ firmId, clientId: ledgerId, challanDate: { $gte: fYearStart, $lte: fYearEnd } }, { _id: 0, amount: 1 });
      let totalDebit = debits.reduce((sum, obj) => sum + obj.amount, 0);

      const credits = await Credit.find({ firmId, clientId: ledgerId, date: { $gte: fYearStart, $lte: fYearEnd } }, { _id: 0, amount: 1 });
      let totalCredits = credits.reduce((sum, obj) => sum + obj.amount, 0);

      // now save debit - credit and save it to ledger opening balance
      const currentLedger = await Ledger.findById(ledgerId);
      if (currentLedger.ledgerGroup == "Sundry Debtors") {
        const dues = (currentLedger.openingBalance + totalDebit) - totalCredits;
        currentLedger.openingBalance = dues;
        await currentLedger.save();
      } else if (currentLedger.ledgerGroup == "Sundry Creditors") {
        const dues = (currentLedger.openingBalance + totalCredits) - totalDebit;
        currentLedger.openingBalance = dues;
        await currentLedger.save();
      }
    }

    // after success update financial year for firm
    fYearStart.setFullYear(fYearStart.getFullYear() + 1);
    fYearEnd.setFullYear(fYearEnd.getFullYear() + 1);

    firm.fYearStart = new Date(fYearStart);
    firm.fYearEnd = new Date(fYearEnd);

    firm.markModified('fYearStart');
    firm.markModified('fYearEnd');
    await firm.save();

    return res.status(200).json({
      success: true,
      message: "All the accounts have been updated."
    })
  } catch (error) {
    console.log(error);
    next(new ErrorResponse(error, 500));
  }
  return res.status(200).json({
    msg: "uncomment the code"
  })
}

async function createFirm(req, res, next) {
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

async function getFirm(req, res, next) {
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

export { createFirm, getFirm, yearEnd }
