const express = require('express')
const router = express.Router()
const { validationsOrigin } = require('../middleware/origin')
const { Origin } = require("../model");

// origin/create
router.get("/", function (req, res, next) {
  res.status(200).send(["Origin"]);
});

router.post("/", validationsOrigin, function (req, res, next) {
  let origin = new Origin()
  origin.name = req.body.name

  origin.save((error, originStored) => {
    if (error) {
      res.status(500).send({ message: error })
    }

    res.status(201).send({ ["origin"]: originStored})
  })
})

module.exports = router