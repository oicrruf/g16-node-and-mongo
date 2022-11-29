const express = require('express')
const router = express.Router()
const { validationsOrigin } = require('../middleware/origin')

// product/create
router.post('/api/v1/origin/create', validationsOrigin, function (req, res, next) {
  res.send(res.body)
})

module.exports = router