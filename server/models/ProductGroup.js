import mongoose from 'mongoose'

const productGroupSchema = new mongoose.Schema({
  productGroup: {
    Type: String,
    required: [true, 'Please provide product group name']
  },
  category1: String,
  category2: String,
  category3: String,
  underParent: mongoose.Schema.ObjectId
})

export const ProductGroup = mongoose.model('ProductGroup', productGroupSchema)
