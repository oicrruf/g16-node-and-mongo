const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const ProductSchema = Schema({
    name: String,
    brand: String,
    price: Number,
    purchase_date: Date,
    purchase_reason: String,
    origin:String,
    shop: String,
    status: String,
    lifespan: Number,
    depreciation: Number,
    depreciation_value: Number,
    maintenance: Number,
    warranty: Number,
    score: Number,
    in_sale: Boolean,
    sale_date: Date
}, {
  timestamps: {
    createdAt: 'created_at', 
    updatedAt: 'updated_at'
  }
})

module.exports = mongoose.model('Product', ProductSchema)