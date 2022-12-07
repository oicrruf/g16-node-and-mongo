const express = require('express');
const router = express.Router();
const {
  validationsCreatePurchaseReason,
  validationsFindByNamePurchaseReason,
} = require('../middleware/purchase-reason');

const { PurchaseReason } = require('../model');

// Create
router.post('/', validationsCreatePurchaseReason, function (req, res, next) {
  let purchase_reason = new PurchaseReason();
  purchase_reason.name = req.body.name;

  purchase_reason.save((error, purchaseReasonStored) => {
    if (error) {
      res.status(500).send({ message: error });
    }
    res.status(201).send(purchaseReasonStored);
  });
});

// Find by id
router.get('/:id', function (req, res, next) {
  PurchaseReason.findById({ _id: req.params.id }, function (err, docs) {
    if (err) {
      res.status(404).send({ name: err.name, message: err.message });
    } else {
      res.status(200).send({ data: docs });
    }
  });
});

// Find by name
router.get(
  '/find',
  validationsFindByNamePurchaseReason,
  function (req, res, next) {
    PurchaseReason.find({ name: req.query.name }, function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        res.status(200).send({ data: docs });
      }
    });
  }
);

// Find all
router.get('/find/all', function (req, res, next) {
  PurchaseReason.find({}, function (err, docs) {
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
  PurchaseReason.findOneAndUpdate(
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
  PurchaseReason.deleteOne(
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
