const express = require('express');

const router = express.Router();
const { validationsShop } = require('../middleware/shop');
const { Shop } = require('../model');

// Create
router.post('/', validationsShop, (req, res) => {
  const shop = new Shop();
  shop.name = req.body.name;
  shop.description = req.body.description;
  shop.invoice_url = req.body.invoice_url;
  shop.online = req.body.online;
  shop.address = req.body.address;
  shop.phone_number = req.body.phone_number;
  shop.contact_email = req.body.contact_email;

  shop.save((error, shopStored) => {
    if (error) {
      res.status(500).send({ message: error });
    }

    res.status(201).send({ shop: shopStored });
  });
});

// Find by id
router.get('/:id', (req, res) => {
  Shop.findById({ _id: req.params.id }, (err, docs) => {
    if (err) {
      throw err;
    } else {
      res.status(200).send({ data: docs });
    }
  });
});

// Find by name
router.get('/find', (req, res) => {
  Shop.find({ name: req.query.name }, (err, docs) => {
    if (err) {
      throw err;
    } else {
      res.status(200).send({ data: docs });
    }
  });
});

// Find all
router.get('/find/all', (req, res) => {
  Shop.find({}, (err, docs) => {
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
  Shop.findOneAndUpdate(
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
  Shop.deleteOne(
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
