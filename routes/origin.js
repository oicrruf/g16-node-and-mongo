const express = require('express')
const router = express.Router()
const { validationsOrigin } = require('../middleware/origin')
const { Origin } = require("../model");

router.get("/find", function (req, res, next) {
  Origin.find({ name: req.query.name }, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      res.status(200).send({ data: docs });
    }
  });
});

router.get("/:id", function (req, res, next) {
  Origin.findById({ _id: req.params.id }, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      res.status(200).send({ data: docs });
    }
  });
});

// origin/create
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