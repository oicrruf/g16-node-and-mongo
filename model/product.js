const mongoose = require('mongoose');

const { Schema } = mongoose;

const ProductSchema = Schema(
  {
    name: String,
    brand: String,
    price: Number,
    purchaseDate: Date,
    purchaseReason: String,
    origin: String,
    shop: String,
    status: String,
    lifespan: Number,
    depreciation: Number,
    depreciationValue: Number,
    maintenance: Number,
    warranty: Number,
    score: Number,
    inSale: Boolean,
    saleDate: Date,
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
);

module.exports = mongoose.model('Product', ProductSchema);
