const mongoose = require('mongoose');

const { Schema } = mongoose;

const PurchaseReasonSchema = Schema(
  {
    name: String,
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
);

module.exports = mongoose.model('PurchaseReason', PurchaseReasonSchema);
