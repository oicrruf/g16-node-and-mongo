const yup = require("yup");

const validations = (req, res, next) => {
  let isValid = false;
  const { id, name, status, califications, price } = req.body;

  let schema = yup.object().shape({
    id: yup.number().required(),
    name: yup.string().required(),
    status: yup.string().required(),
    califications: yup.number().required(),
    price: yup.number(),
  });

  schema
    .validate({ id, name, status, califications, price })
    .then(function (valid) {
      isValid = valid;
      res.send({ id, name, status, califications, price });
      next();
    })
    .catch((err) => {
      res.send({
        type: err.name,
        message: err.errors[0],
      });
      next();
    });
};

module.exports = { validations };
