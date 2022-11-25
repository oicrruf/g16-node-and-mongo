const express = require("express");
const package = require("../package.json");
const router = express.Router();

const { validations } = require("../middleware");

router.get("/health", function (req, res, next) {
  const { name, version } = package;
  res.send({
    name,
    version,
  });
});

router.post("/api/v1/product/create", validations, function (req, res, next) {
  res.send(res.body);
});

module.exports = router;
