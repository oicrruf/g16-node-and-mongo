const yup = require('yup')

const validationsPurchaseReason = (req, res, next) => {
  let isValid = false
  let message = ''

  const {
    id,
    name
  } = req.body

  const schema = yup.object().shape({
    id: yup.number().required(),
    name: yup.string().required
  })

  schema
    .validate({
      id,
      name
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
          name
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

module.exports = { validationsPurchaseReason }