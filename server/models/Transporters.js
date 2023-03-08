import mongoose from 'mongoose'

const TrasporterSchema = new mongoose.Schema({
  firmId: {
    type: mongoose.Schema.ObjectId,
    required: [true, 'Please provide firm id.']
  },
  transporterName: {
    type: String,
    required: [true, "Please provide tranporter's name."],
    uppercase: true
  },
  gst_no: {
    type: String,
    required: [true, 'Please provide GST Number for Transporter.'],
    match: [
      /^$|[0-9]{2}[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}[1-9A-Za-z]{1}Z[0-9A-Za-z]{1}$/,
      'Please enter valid GST Number.'
    ],
    uppercase: true,
    maxlength: 15
  }
})

export const Transporter = mongoose.model('Transporter', TrasporterSchema)
