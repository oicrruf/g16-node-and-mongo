const express = require('express')
const router = express.Router()
const { validationsPurchaseReason } = require('../middleware/purchase_reason')

// product/create
router.post('/api/v1/purchase-reason/create', validationsPurchaseReason, function (req, res, next) {
  res.send(res.body)
})

module.exports = router