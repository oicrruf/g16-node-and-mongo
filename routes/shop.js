const express = require('express')
const router = express.Router()
const { validationsShop } = require('../middleware/shop')

// shop/create
router.post('/create', validationsShop, function (req, res, next) {
  res.send(res.body)
})

module.exports = router
