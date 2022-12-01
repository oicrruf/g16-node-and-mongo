const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const UserSchema = Schema({
  first_name: String,
  last_name: String,
  email: String,
  password: String,
  gender: String
}, {
  timestamps: {
    createdAt: 'created_at', 
    updatedAt: 'updated_at'
  }
})

module.exports = mongoose.model('User', UserSchema)