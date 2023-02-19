import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema({
  firmId: {
    Type: mongoose.Schema.ObjectId,
    required: [true, 'Please provide firm id.']
  },
  productName: {
    Type: String,
    required: [true, 'Please provide Product Name']
  },
  description: String,
  productGroup: {
    Type: mongoose.Schema.ObjectId
  },
  hsn: {
    Type: Number,
    required: [true, 'Please provide HSN code'],
    match: ['^d+$', 'Plese provide valid HSN code'],
    minlength: 4,
    maxlength: 8
  },
  productType: {
    Type: String,
    enum: {
      values: ['Goods', 'Service'],
      message: 'Not a valid product type'
    }
  },
  unit: {
    Type: String,
    default: 'Pcs'
  },
  openingQty: {
    Type: Number,
    default: 0,
    match: ['^d+$', 'Opening quantity field accept only natural numbers.']
  },
  openingRate: {
    Type: Number,
    default: 0,
    match: [
      '^[1-9]d*(.d+)?$',
      'Opening rate field accepts natural numbers and decimals only.'
    ]
  },
  gstState: {
    type: String,
    required: [true, 'This field Can not be empty'],
    enum: {
      values: ['0% GST', '5% GST', '12% GST', '18% GST', '28% GST'],
      message: 'Please select valid GST tax'
    }
  },
  igstOutside: {
    type: String,
    required: [true, 'This field Can not be empty'],
    enum: {
      values: ['0% IGST', '5% IGST', '12% IGST', '18% IGST', '28% IGST'],
      message: 'Please select valid GST tax'
    }
  },
  purchaseRate: {
    Type: Number,
    default: 0,
    match: [
      '^[1-9]d*(.d+)?$',
      'Opening rate field accepts natural numbers and decimals only.'
    ]
  },
  saleRate: {
    Type: Number,
    default: 0,
    match: [
      '^[1-9]d*(.d+)?$',
      'Opening rate field accepts natural numbers and decimals only.'
    ]
  }
})

export const Product = mongoose.model('Product', ProductSchema)
