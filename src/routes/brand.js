const express = require('express');

const router = express.Router();
const {
  validationsCreateBrand,
  validationsFindByNameBrand,
} = require('../middleware/brand');

const { Brand } = require('../model');

// Create
router.post('/', validationsCreateBrand, (req, res) => {
  const brand = new Brand();
  brand.name = req.body.name;

  Brand.save((error, brandStored) => {
    if (error) {
      res.status(500).send({ message: error });
    }
    res.status(201).send(brandStored);
  });
});

// Find by id
router.get('/:id', (req, res) => {
  Brand.findById({ _id: req.params.id }, (err, docs) => {
    if (err) {
      res.status(404).send({ name: err.name, message: err.message });
    } else {
      res.status(200).send({ data: docs });
    }
  });
});

// Find by name
router.get('/find', validationsFindByNameBrand, (req, res) => {
  Brand.find({ name: req.query.name }, (err, docs) => {
    if (err) {
      throw err;
    } else {
      res.status(200).send({ data: docs });
    }
  });
});

// Find all
router.get('/find/all', (req, res) => {
  Brand.find({}, (err, docs) => {
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
  Brand.findOneAndUpdate(
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
  Brand.deleteOne(
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
