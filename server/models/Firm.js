import mongoose from 'mongoose'

import { ErrorResponse } from '../utils/errorResponse.js'
import { gstStates } from '../utils/gstStates.js'
import { titleCase } from '../utils/titleCase.js'

const FirmSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    required: [true, 'Please provide user']
  },
  companyName: {
    type: String,
    required: [true, 'Please enter Company Name'],
    unique: true
  },
  address: {
    line1: String,
    line2: String,
    line3: String
  },
  mobile: {
    type: String,
    default: null,
    minlength: 10,
    maxlength: 10,
    match: [/^(\s*|\d+)$/, 'please enter a valid number']
  },
  gst_no: {
    type: String,
    required: [true, 'Please add Gst Number'],
    unique: true,
    match: [
      /^[0-9]{2}[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}[1-9A-Za-z]{1}Z[0-9A-Za-z]{1}$/,
      'Please enter valid GST Number.'
    ],
    uppercase: true,
    minlength: 15,
    maxlength: 15
  },
  gst_state: String,
  pan_no: String
})

FirmSchema.pre('save', async function (next) {
  this.companyName = titleCase(this.companyName)
  this.pan_no = this.gst_no.slice(2, 12)
  const stateCode = parseInt(this.gst_no.slice(0, 2))
  const gstCodes = Object.keys(gstStates)

  if (!gstCodes.filter(x => parseInt(x) === stateCode).length) {
    next(new ErrorResponse('Please enter valid GST Number', 400))
  }

  for (let state in gstStates) {
    if (parseInt(state) === stateCode) {
      this.gst_state = gstStates[state]
    }
  }
  next()
})

const Firm = mongoose.model('Firm', FirmSchema)

export { Firm }
