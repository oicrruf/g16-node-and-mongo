const express = require('express')
const router = express.Router()
const { validationsUser } = require('../middleware/user')

// product/create
router.post('/api/v1/user/create', validationsUser, function (req, res, next) {
  res.send(res.body)
})

module.exports = router