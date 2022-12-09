/* eslint-disable camelcase */
const yup = require('yup');

const validationsUser = (req, res, next) => {
  let isValid = false;
  let message = '';

  const { firstName, lastName, email, password, gender } = req.body;

  const schema = yup.object().shape({
    first_name: yup.string().required().strict(),
    last_name: yup.string().required().strict(),
    email: yup.string().email().required().strict(),
    password: yup
      .string()
      .required()
      .matches(/[a-zA-Z]/)
      .min(8)
      .strict(),
    gender: yup
      .string()
      .lowercase()
      .oneOf(['masculino', 'femenino', 'otro'])
      .required(),
  });

  schema
    .validate({
      firstName,
      lastName,
      email,
      password,
      gender,
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

module.exports = { validationsUser };
