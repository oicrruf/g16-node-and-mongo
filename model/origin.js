const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const OriginSchema = Schema({
  name: String
}, {
  timestamps: {
    createdAt: 'created_at', 
    updatedAt: 'updated_at'
  }
})

module.exports = mongoose.model('Origin', OriginSchema)