/* eslint-disable camelcase */
const express = require('express');

const router = express.Router();
const passport = require('passport');
const {
  validationsCreatePurchaseReason,
  validationsFindByNamePurchaseReason,
} = require('../middleware/purchase-reason');
const { PurchaseReason } = require('../model');

// Create
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  validationsCreatePurchaseReason,
  (req, res) => {
    const purchaseReason = new PurchaseReason();
    purchaseReason.name = req.body.name;

    purchaseReason.save((error, purchaseReasonStored) => {
      if (error) {
        res.status(500).send({ message: error });
      }
      res.status(201).send(purchaseReasonStored);
    });
  }
);

// Find by name
router.get(
  '/find',
  passport.authenticate('jwt', { session: false }),
  validationsFindByNamePurchaseReason,
  (req, res) => {
    PurchaseReason.find({ name: req.query.name }, (err, docs) => {
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
    PurchaseReason.findById({ _id: req.params.id }, (err, docs) => {
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
    PurchaseReason.find({}, (err, docs) => {
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
    PurchaseReason.findOneAndUpdate(
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
    PurchaseReason.deleteOne(
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
