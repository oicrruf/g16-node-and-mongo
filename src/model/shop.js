const mongoose = require('mongoose');

const { Schema } = mongoose;

const ShopSchema = Schema(
  {
    name: String,
    description: String,
    invoice_url: String,
    online: Boolean,
    address: String,
    phoneNumber: Number,
    contactEmail: String,
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
);

module.exports = mongoose.model('Shop', ShopSchema);
