const mongoose = require('mongoose');

const { Schema } = mongoose;

const OriginSchema = Schema(
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

module.exports = mongoose.model('Origin', OriginSchema);
