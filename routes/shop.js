const express = require('express')
const router = express.Router()
const { validations } = require('../middleware/product')

// product/create
router.post('/api/v1/shop/create', validations, function (req, res, next) {
  res.send(res.body)
})

module.exports = router
