const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const BrandSchema = Schema({
  name: String,
  description: String
}, {
  timestamps: {
    createdAt: 'created_at', 
    updatedAt: 'updated_at'
  }
})

module.exports = mongoose.model('Brand', BrandSchema)