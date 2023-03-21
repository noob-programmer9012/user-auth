import mongoose from 'mongoose'

import { titleCase } from '../utils/titleCase.js'

const ProductSchema = new mongoose.Schema({
  firmId: {
    type: mongoose.Schema.ObjectId,
    required: [true, 'Please provide firm id.']
  },
  productName: {
    type: String,
    required: [true, 'Please provide Product Name']
  },
  description: String,
  productGroup: {
    type: mongoose.Schema.ObjectId
  },
  hsn: {
    type: Number,
    required: [true, 'Please provide HSN code'],
    match: ['^d+$', 'Plese provide valid HSN code'],
    minlength: 4,
    maxlength: 8
  },
  productType: {
    type: String,
    enum: {
      values: ['Goods', 'Service'],
      message: 'Not a valid product type'
    }
  },
  unit: {
    type: String,
    default: 'Pcs'
  },
  openingQty: {
    type: Number,
    default: 0,
    match: ['^d+$', 'Opening quantity field accept only natural numbers.']
  },
  openingRate: {
    type: Number,
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
    type: Number,
    default: 0,
    match: [
      '^[1-9]d*(.d+)?$',
      'Opening rate field accepts natural numbers and decimals only.'
    ]
  },
  saleRate: {
    type: Number,
    default: 0,
    match: [
      '^[1-9]d*(.d+)?$',
      'Opening rate field accepts natural numbers and decimals only.'
    ]
  }
})

ProductSchema.pre('save', function (next) {
  this.productName = titleCase(this.productName)
  next()
})

export const Product = mongoose.model('Product', ProductSchema)
