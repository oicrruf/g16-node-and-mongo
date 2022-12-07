const express = require('express')
const router = express.Router()
const { validationsOrigin } = require('../middleware/origin')
const { Origin } = require("../model");

// Create
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

// Find by id
router.get("/:id", function (req, res, next) {
  Origin.findById({ _id: req.params.id }, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      res.status(200).send({ data: docs });
    }
  });
});

// Find by name
router.get("/find", function (req, res, next) {
  Origin.find({ name: req.query.name }, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      res.status(200).send({ data: docs });
    }
  });
});

// Find all
router.get("/find/all", function (req, res, next) {
  Origin.find({}, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      res.status(200).send({ data: docs });
    }
  });
});

// Update
router.patch("/update", function (req, res, next) {
  let key = Object.keys(req.query)[0];
  Origin.findOneAndUpdate(
    { [key]: req.query[key] }, // Valor buscado
    { [key]: req.body.value }, // Nuevo valor
    function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        res.status(200).send({ data: docs });
      }
    }
  );
});

// Delete by id 
router.delete("/:id", function (req, res, next) {
  Origin.deleteOne(
    { _id: req.params.id },

    function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        res.status(200).send({ data: docs });
      }
    }
  );
});

module.exports = router