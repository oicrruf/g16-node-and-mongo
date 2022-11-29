const yup = require('yup')

const validationsShop = (req, res, next) => {
  let isValid = false
  let message = ''

  const {
    id,
  } = req.body

  const schema = yup.object().shape({
    id: yup.number().required(),
  })

  schema
    .validate({
      id,
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
