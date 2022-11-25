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
  const { id, name, status, califications, price } = req.body;

  let schema = yup.object().shape({
    id: yup.number().required(),
    name: yup.string().required(),
    status: yup.string().required(),
    califications: yup.number().required(),
    price: yup.number(),
  });

  schema
    .isValid({ id, name, status, califications, price })
    .then(function (valid) {
      isValid = valid;
    });
  // schema
  //   .isValid({ id, name, status, califications, price })
  //   .catch(function (err) {
  //     console.log(err.name);
  //   });

  if (isValid) {
    res.send({ id, name, status, califications, price });
  } else {
    res.send({ message: "error" });
  }
});

module.exports = router;
