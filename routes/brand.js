const express = require('express');
const router = express.Router();
const {
  validationsCreateBrand,
  validationsFindByNameBrand,
} = require('../middleware/brand');

const { Brand } = require('../model');

// Create
router.post('/', validationsCreateBrand, function (req, res, next) {
  let brand = new Brand();
  brand.name = req.body.name;

  Brand.save((error, brandStored) => {
    if (error) {
      res.status(500).send({ message: error });
    }
    res.status(201).send(brandStored);
  });
});

// Find by id
router.get('/:id', function (req, res, next) {
  Brand.findById({ _id: req.params.id }, function (err, docs) {
    if (err) {
      res.status(404).send({ name: err.name, message: err.message });
    } else {
      res.status(200).send({ data: docs });
    }
  });
});

// Find by name
router.get('/find', validationsFindByNameBrand, function (req, res, next) {
  Brand.find({ name: req.query.name }, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      res.status(200).send({ data: docs });
    }
  });
});

// Find all
router.get('/find/all', function (req, res, next) {
  Brand.find({}, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      res.status(200).send({ data: docs });
    }
  });
});

// Update
router.patch('/update', function (req, res, next) {
  let key = Object.keys(req.query)[0];
  Brand.findOneAndUpdate(
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
router.delete('/:id', function (req, res, next) {
  Brand.deleteOne(
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

module.exports = router;
