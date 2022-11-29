const express = require("express");
const packageJSN = require("../package.json");
const router = express.Router();
const { validationsProducts } = require("../middleware/product");

/* GET home page. */
router.get("/health", function (req, res, next) {
  const { name, version } = packageJSN;
  res.send({
    name,
    version,
  });
});

// product/create
router.post(
  "/api/v1/product/create",
  validationsProducts,
  function (req, res, next) {
    res.send(res.body);
  }
);

module.exports = router;
