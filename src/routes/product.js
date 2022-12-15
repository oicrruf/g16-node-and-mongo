const express = require('express');

const router = express.Router();
const passport = require('passport');
const {
  validationsCreateProduct,
  validationsFindByNameProduct,
} = require('../middleware/product');

const { Product } = require('../model');

// Create
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  validationsCreateProduct,
  (req, res) => {
    const product = new Product();
    product.name = req.body.name;
    product.brand = req.body.brand;
    product.price = req.body.price;
    product.purchaseDate = req.body.purchaseDate;
    product.purchaseReason = req.body.purchaseReason;
    product.origin = req.body.origin;
    product.shop = req.body.shop;
    product.status = req.body.status;
    product.lifespan = req.body.lifespan;
    product.depreciation = req.body.depreciation;
    product.depreciationValue = req.body.depreciationValue;
    product.maintenance = req.body.maintenance;
    product.warranty = req.body.warranty;
    product.score = req.body.score;
    product.inSale = req.body.inSale;
    product.saleDate = req.body.saleDate;

    product.save((error, productStored) => {
      if (error) {
        res.status(500).send({ message: error });
      }
      res.status(201).send(productStored);
    });
  }
);

// Find by name
router.get(
  '/find',
  passport.authenticate('jwt', { session: false }),
  validationsFindByNameProduct,
  (req, res) => {
    Product.find({ name: req.query.name }, (err, docs) => {
      if (err) {
        throw err;
      } else {
        res.status(200).send({ data: docs });
      }
    });
  }
);

// Find by id
router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Product.findById({ _id: req.params.id }, (err, docs) => {
      if (err) {
        res.status(404).send({ name: err.name, message: err.message });
      } else {
        res.status(200).send({ data: docs });
      }
    });
  }
);

// Find all
router.get(
  '/find/all',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Product.find({}, (err, docs) => {
      if (err) {
        throw err;
      } else {
        res.status(200).send({ data: docs });
      }
    });
  }
);

// Update
router.patch(
  '/update',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const key = Object.keys(req.query)[0];
    Product.findOneAndUpdate(
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
  }
);

// Delete by id
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Product.deleteOne(
      { _id: req.params.id },

      (err, docs) => {
        if (err) {
          throw err;
        } else {
          res.status(200).send({ data: docs });
        }
      }
    );
  }
);

module.exports = router;
