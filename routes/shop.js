const express = require('express')
const router = express.Router()
const { validationsShop } = require('../middleware/shop')
const { Shop } = require("../model");

// Create
router.post("/", validationsShop, function (req, res, next) {
  let shop = new Shop()
  shop.name = req.body.name
  shop.description = req.body.description
  shop.invoice_url = req.body.invoice_url
  shop.online = req.body.online
  shop.address = req.body.address
  shop.phone_number = req.body.phone_number
  shop.contact_email = req.body.contact_email

  shop.save((error, shopStored) => {
    if (error) {
      res.status(500).send({ message: error })
    }

    res.status(201).send({ ["shop"]: shopStored})
  })
})

// Find by id
router.get("/:id", function (req, res, next) {
  Shop.findById({ _id: req.params.id }, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      res.status(200).send({ data: docs });
    }
  });
});

// Find by name
router.get("/find", function (req, res, next) {
  Shop.find({ name: req.query.name }, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      res.status(200).send({ data: docs });
    }
  });
});

// Find all
router.get("/find/all", function (req, res, next) {
  Shop.find({}, function (err, docs) {
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
  Shop.findOneAndUpdate(
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
  Shop.deleteOne(
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
