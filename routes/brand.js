const express = require('express')
const router = express.Router()
const { validationsBrand } = require('../middleware/brand')
const { Brand } = require("../model");

router.get("/", function (req, res, next) {
  res.status(200).send(["Brand"]);
});

// brand/create
router.post("/", validationsBrand, function (req, res, next) {
  let brand = new Brand()
  brand.name = req.body.name
  brand.description = req.body.description

  brand.save((error, brandStored) => {
    if (error) {
      res.status(500).send({ message: error })
    }

    res.status(201).send({ ["brand"]: brandStored})
  })
})

module.exports = router
