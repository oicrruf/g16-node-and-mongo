const express = require("express");
const router = express.Router();
const {
  validationsCreateBrand,
  validationsFindByNameBrand
} = require("../middleware/brand");

const { Brand } = require("../model");

router.get("/find-brand", validationsFindByNameBrand, function (req, res, next) {
  Brand.find({ name: req.query.name }, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      res.status(200).send({ data: docs });
    }
  });
});

router.get("/:id-brand", function (req, res, next) {
  Brand.findById({ _id: req.params.id }, function (err, docs) {
    if (err) {
      res.status(404).send({name: err.name, message: err.message});
    } else {
      res.status(200).send({ data: docs });
    }
  });
});

// purchaseReason/create
router.post("/brand", validationsCreateBrand, function (req, res, next) {
  let brand = new Brand();
  brand.name = req.body.name;

  brand.save((error, brandStored) => {
    if (error) {
      res.status(500).send({ message: error });
    }

    // res.status(201).send({ ["brand"]: brandStored });
    res.status(201).send(brandStored);
  });
});



module.exports = router;