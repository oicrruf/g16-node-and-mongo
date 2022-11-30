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

module.exports = router;
