const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment')

const { Schema } = mongoose

const landingSchema = new Schema({
  url: String,
  confirmed: Boolean
}, {
  _id: false,
  versionKey: false
})

const productSchema = new Schema({
  _id: Number,
  seller_id: Number,
  sku: String,
  name: String,
  type: String,
  price: Number,
  landing: landingSchema
}, {
  versionKey: false,
  timestamps: true
})

productSchema.plugin(autoIncrement.plugin, { 
  model: 'User',
  startAt: 1
})

mongoose.model("Product", productSchema)