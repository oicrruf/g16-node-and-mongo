const express = require("express");
const package = require("../package.json");
const router = express.Router();
const yup = require("yup");

router.get("/health", function (req, res, next) {
  const { name, version } = package;
  res.send({
    name,
    version,
  });
});

router.post("/api/v1/validations", function (req, res, next) {
  let isValid = false;
  let messageError = [];
  const { id, name, status, califications, price } = req.body;

  let schema = yup.object().shape({
    id: yup.number().required(),
    name: yup.string().required(),
    status: yup.string().required(),
    califications: yup.number().required(),
    price: yup.number(),
  });

  schema
    .validate({ id, name, status, califications, price })
    .then(function (valid) {
      isValid = valid;
    })
    .catch((err) => {
      res.send({
        type: err.name,
        message: err.errors[0],
      });
    });

  if (isValid) {
    res.send({ id, name, status, califications, price });
  }
});

module.exports = router;
