import mongoose from 'mongoose'

import { gstStates } from '../utils/gstStates.js'
import { ErrorResponse } from '../utils/errorResponse.js'
import { titleCase } from '../utils/titleCase.js'

const LedgerSchema = new mongoose.Schema({
  firmId: {
    type: mongoose.Schema.ObjectId,
    required: [true, 'No firm registered with this id.']
  },
  companyName: {
    type: String,
    required: [true, 'Please enter company name']
  },
  ledgerGroup: {
    type: String,
    enum: {
      values: ['Sundry Debtors', 'Sundry Creditors', 'Bank Accounts'],
      message: 'Not a valid Ledger Item.'
    }
  },
  openingBalance: {
    type: Number,
    default: 0.0
  },
  address: {
    line1: String,
    line2: String,
    line3: String
  },
  pincode: {
    type: String,
    match: [/^(\s*|\d+)$/, 'please enter a valid pincode']
  },
  gst_no: {
    type: String,
    match: [
      /^$|[0-9]{2}[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}[1-9A-Za-z]{1}Z[0-9A-Za-z]{1}$/,
      'Please enter valid GST Number.'
    ],
    uppercase: true,
    maxlength: 15
  },
  gst_state: String,
  pan_no: String,
  mobile: {
    type: String,
    default: null,
    maxlength: 10,
    match: [/^$|(\s*|\d+)$/, 'please enter a valid number']
  },
  email: {
    type: String,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please enter an valid email address'
    ]
  }
})

LedgerSchema.pre('save', function (next) {
  this.pan_no = this.gst_no.slice(2, 12)
  this.companyName = titleCase(this.companyName)
  const gstCode = parseInt(this.gst_no.slice(0, 2))
  this.address.line1 = this.address.line1 ? titleCase(this.address.line1) : ''
  this.address.line2 = this.address.line2 ? titleCase(this.address.line2) : ''
  this.address.line3 = this.address.line3 ? titleCase(this.address.line3) : ''
  if (this.gst_no) {
    this.gst_state = Object.keys(gstStates).filter(x => gstCode === parseInt(x))
      .length
      ? gstStates[gstCode]
      : next(new ErrorResponse('Please enter valid GST Number', 400))
  }
  next()
})

export const Ledger = mongoose.model('Ledger', LedgerSchema)
