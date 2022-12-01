const express = require("express");
const router = express.Router();
const { validationsPurchaseReason } = require("../middleware/purchase-reason");
const {PurchaseReason} = require("../model");

router.get("/", function (req, res, next) {
  res.status(200).send(["Purchase reason"]);
});

// purchaseReason/create
router.post("/", validationsPurchaseReason, function (req, res, next) {
  let purchase_reason = new PurchaseReason();
  purchase_reason.name = req.body.name;

  purchase_reason.save((error, purchaseReasonStored) => {
    if (error) {
      res.status(500).send({ message: error });
    }

    res.status(201).send({ ["purchase_reason"]: purchaseReasonStored });
  });

});

module.exports = router;
