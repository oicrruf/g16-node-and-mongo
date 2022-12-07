const express = require('express');

const router = express.Router();
const { validationsOrigin } = require('../middleware/origin');
const { Origin } = require('../model');

// Create
router.post('/', validationsOrigin, (req, res) => {
  const origin = new Origin();
  origin.name = req.body.name;

  origin.save((error, originStored) => {
    if (error) {
      res.status(500).send({ message: error });
    }
    res.status(201).send({ origin: originStored });
  });
});

// Find by id
router.get('/:id', (req, res) => {
  Origin.findById({ _id: req.params.id }, (err, docs) => {
    if (err) {
      throw err;
    } else {
      res.status(200).send({ data: docs });
    }
  });
});

// Find by name
router.get('/find', (req, res) => {
  Origin.find({ name: req.query.name }, (err, docs) => {
    if (err) {
      throw err;
    } else {
      res.status(200).send({ data: docs });
    }
  });
});

// Find all
router.get('/find/all', (req, res) => {
  Origin.find({}, (err, docs) => {
    if (err) {
      throw err;
    } else {
      res.status(200).send({ data: docs });
    }
  });
});

// Update
router.patch('/update', (req, res) => {
  const key = Object.keys(req.query)[0];
  Origin.findOneAndUpdate(
    { [key]: req.query[key] }, // Valor buscado
    { [key]: req.body.value }, // Nuevo valor
    (err, docs) => {
      if (err) {
        throw err;
      } else {
        res.status(200).send({ data: docs });
      }
    }
  );
});

// Delete by id
router.delete('/:id', (req, res) => {
  Origin.deleteOne(
    { _id: req.params.id },

    (err, docs) => {
      if (err) {
        throw err;
      } else {
        res.status(200).send({ data: docs });
      }
    }
  );
});

module.exports = router;
