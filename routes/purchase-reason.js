const express = require("express");
const router = express.Router();
const { validationsPurchaseReason } = require("../middleware/purchase-reason");
const { PurchaseReason } = require("../model");

router.get("/find", function (req, res, next) {
  PurchaseReason.find({ name: req.query.name }, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      res.status(200).send({ data: docs });
    }
  });
});

router.get("/:id", function (req, res, next) {
  PurchaseReason.findById({ _id: req.params.id }, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      res.status(200).send({ data: docs });
    }
  });
});

// purchaseReason/create
router.post("/", validationsPurchaseReason, function (req, res, next) {
  let purchase_reason = new PurchaseReason();
  purchase_reason.name = req.body.name;

  purchase_reason.save((error, purchaseReasonStored) => {
    if (error) {
      res.status(500).send({ message: error });
    }

    // res.status(201).send({ ["purchase_reason"]: purchaseReasonStored });
    res.status(201).send(purchaseReasonStored);
  });
});

module.exports = router;
