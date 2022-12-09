/* eslint-disable camelcase */
const yup = require('yup');

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validationsShop = (req, res, next) => {
  let isValid = false;
  let message = '';

  const {
    name,
    description,
    invoiceUrl,
    online,
    address,
    phoneNumber,
    contactEmail,
  } = req.body;

  const schema = yup.object().shape({
    name: yup.string().required().strict(),
    description: yup.string().required().strict(),
    invoice_url: yup.string().required().strict(),
    online: yup.boolean().required(),
    address: yup.string().required().strict(),
    phone_number: yup.string().required().matches(phoneRegExp).min(10).max(10),
    contact_email: yup.string().email().required().strict(),
  });

  schema
    .validate({
      name,
      description,
      invoiceUrl,
      online,
      address,
      phoneNumber,
      contactEmail,
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

module.exports = { validationsShop };
