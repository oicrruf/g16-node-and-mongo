const express = require('express');

const router = express.Router();
const { validationsUser } = require('../middleware/user');
const { User } = require('../model');

// Create
router.post('/', validationsUser, (req, res) => {
  const user = new User();
  user.first_name = req.body.first_name;
  user.last_name = req.body.last_name;
  user.email = req.body.email;
  user.password = req.body.password;
  user.gender = req.body.gender;

  user.save((error, userStored) => {
    if (error) {
      res.status(500).send({ message: error });
    }

    res.status(201).send({ user: userStored });
  });
});

// Find by id
router.get('/:id', (req, res) => {
  User.findById({ _id: req.params.id }, (err, docs) => {
    if (err) {
      throw err;
    } else {
      res.status(200).send({ data: docs });
    }
  });
});

// Find by name
router.get('/find', (req, res) => {
  User.find({ name: req.query.name }, (err, docs) => {
    if (err) {
      throw err;
    } else {
      res.status(200).send({ data: docs });
    }
  });
});

// Find all
router.get('/find/all', (res) => {
  User.find({}, (err, docs) => {
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
  User.findOneAndUpdate(
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
  User.deleteOne(
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
