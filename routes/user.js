const express = require('express')
const router = express.Router()
const { validationsUser } = require('../middleware/user')
const { User } = require("../model");

router.get("/find", function (req, res, next) {
  User.find({ name: req.query.name }, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      res.status(200).send({ data: docs });
    }
  });
});

router.get("/:id", function (req, res, next) {
  User.findById({ _id: req.params.id }, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      res.status(200).send({ data: docs });
    }
  });
});

// user/create
router.post("/", validationsUser, function (req, res, next) {
  let user = new User()
  user.first_name = req.body.first_name
  user.last_name = req.body.last_name
  user.email = req.body.email
  user.password = req.body.password
  user.gender = req.body.gender

  user.save((error, userStored) => {
    if (error) {
      res.status(500).send({ message: error })
    }

    res.status(201).send({ ["user"]: userStored})
  })
})

module.exports = router