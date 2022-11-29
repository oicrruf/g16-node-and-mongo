const yup = require('yup')
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validationsShop = (req, res, next) => {
  let isValid = false
  let message = ''

  const {
    id,
    name,
    description,
    invoice_url,
    online,
    adress,
    phone_number,
    contact_email
  } = req.body

  const schema = yup.object().shape({
    id: yup.number().required(),
    name: yup.string().required,
    description: yup.string().required(),
    invoice_url: yup.string().required(),
    online: yup.boolean().required(),
    adress: yup.string().required(),
    phone_number: yup.string().required().matches(phoneRegExp).min(10).max(10),
    contact_email: yup.string().email().required()
  })

  schema
    .validate({
      id,
      name,
      description,
      invoice_url,
      online,
      adress,
      phone_number,
      contact_email
    })
    .then(function (valid) {
      isValid = valid
    }).catch((err) => {
      message = err
    })
    .then(() => {
      if (isValid) {
        res.send({
          id,
        name,
        description,
        invoice_url,
        online,
        adress,
        phone_number,
        contact_email
        })
        next()
      } else {
        res.send({
          error: {
            type: message.name,
            message: message.errors[0]
          }
        })
        next()
      }
    })
}

module.exports = { validationsShop }
