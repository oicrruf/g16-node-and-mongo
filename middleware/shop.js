const yup = require('yup')

const validationsShop = (req, res, next) => {
  let isValid = false
  let message = ''

  const {
    id,
    name,
    description,
    invoice_url,
    online,
    address,
    phone_number,
    contact_email
  } = req.body

  const schema = yup.object().shape({
    id: yup.number().required(),
    name: yup.string().required(),
    description: yup.string().required(),
    invoice_url: yup.string().required(),
    online: yup.boolean().required(),
    address: yup.string().required(),
    phone_number: yup.number().required().positive().integer(),
    contact_email: yup.string().required()
  })

  schema
    .validate({
      id,
      name,
      description,
      invoice_url,
      online,
      address,
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
          address,
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
