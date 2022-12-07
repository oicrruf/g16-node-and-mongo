const yup = require('yup');

const validationsFindByNameBrand = (req, res, next) => {
  let isValid = false;
  let message = '';

  const { name } = req.query;

  const schema = yup.object().shape({
    name: yup.string().required().strict(),
  });

  schema
    .validate({
      name,
    })
    .then((valid) => {
      isValid = valid;
    })
    .catch((err) => {
      message = err;
    })
    .then(() => {
      if (isValid) {
        next();
      } else {
        res.send({
          error: {
            type: message.name,
            message: message.errors[0],
          },
        });
      }
    });
};

module.exports = { validationsFindByNameBrand };
