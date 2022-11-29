const express = require('express')
const router = express.Router()
const { validationsBrand } = require('../middleware/brand')

// product/create
router.post('/api/v1/brand/create', validationsBrand, function (req, res, next) {
  res.send(res.body)
})

module.exports = router