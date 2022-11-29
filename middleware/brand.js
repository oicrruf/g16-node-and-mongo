const yup = require('yup')

const validationsBrand = (req, res, next) => {
  let isValid = false
  let message = ''

  const {
    id,
    name,
    description
  } = req.body

  const schema = yup.object().shape({
    id: yup.number().required(),
    name: yup.string().required,
    description: yup.string().required()
  })

  schema
    .validate({
      id,
      name,
      description
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
            description
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

module.exports = { validationsBrand }