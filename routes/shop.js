const express = require('express')
const router = express.Router()
const { validationsShop } = require('../middleware/shop')
const { Shop } = require("../model");

router.get("/", function (req, res, next) {
  res.status(200).send(["Shop"]);
});

// shop/create
router.post("/", validationsShop, function (req, res, next) {
  let shop = new Shop()
  shop.name = req.body.name
  shop.description = req.body.description
  shop.invoice_url = req.body.invoice_url
  shop.online = req.body.online
  shop.address = req.body.address
  shop.phone_number = req.body.phone_number
  shop.contact_email = req.body.contact_email

  shop.save((error, shopStored) => {
    if (error) {
      res.status(500).send({ message: error })
    }

    res.status(201).send({ ["shop"]: shopStored})
  })
})

module.exports = router
