const express = require('express');

const router = express.Router();
// const { validationsUser } = require('../middleware/user');
const passport = require('passport');
const { User } = require('../model');

/* En el archivo auth.js ya existe una ruta para hacer signup (crear nuevo usuario) */
// Create
// router.post('/', validationsUser, (req, res) => {
//   const user = new User();
//   user.first_name = req.body.first_name;
//   user.last_name = req.body.last_name;
//   user.email = req.body.email;
//   user.password = req.body.password;
//   user.gender = req.body.gender;

//   user.save((error, userStored) => {
//     if (error) {
//       res.status(500).send({ message: error });
//     }

//     res.status(201).send({ user: userStored });
//   });
// });

// Find by email
router.get(
  '/find',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    User.find({ email: req.query.email }, (err, docs) => {
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
    User.findById({ _id: req.params.id }, (err, docs) => {
      if (err) {
        throw err;
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
    User.find({}, (err, docs) => {
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
  }
);

// Delete by id
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    User.deleteOne({ _id: req.params.id }, (err, docs) => {
      if (err) {
        throw err;
      } else {
        res.status(200).send({ data: docs });
      }
    });
  }
);

module.exports = router;
