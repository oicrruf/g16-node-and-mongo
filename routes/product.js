const express = require("express");
const router = express.Router();
const { validationsProducts } = require("../middleware/product");

// product/create
router.post(
  "/api/v1/product/create",
  validationsProducts,
  function (req, res, next) {
    res.send(res.body);
  }
);

module.exports = router;
