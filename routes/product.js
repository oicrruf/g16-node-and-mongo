const express = require("express");
const router = express.Router();
const { validationsProducts } = require("../middleware/product");
const { Product } = require("../model");

router.get("/", function (req, res, next) {
  res.status(200).send(["Product"]);
});

// product/create
router.post("/", validationsProducts, function (req, res, next) {
  let product = new Product()
  product.name = req.body.name
  product.brand = req.body.brand
  product.price = req.body.price
  product.purchase_date = req.body.purchase_date
  product.purchase_reason = req.body.purchase_reason
  product.origin = req.body.origin
  product.shop = req.body.shop
  product.status = req.body.status
  product.lifespan = req.body.lifespan
  product.depreciation = req.body.depreciation
  product.depreciation_value = req.body.depreciation_value
  product.maintenance = req.body.maintenance
  product.warranty = req.body.warranty
  product.score = req.body.score
  product.in_sale = req.body.in_sale
  product.sale_date = req.body.sale_date

  product.save((error, productStored) => {
    if (error) {
      res.status(500).send({ message: error })
    }

    res.status(201).send({ ["product"]: productStored})
  })
})

module.exports = router;
