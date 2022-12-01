const yup = require('yup')

const validationsOrigin = (req, res, next) => {
  let isValid = false
  let message = ''

  const {
    name
  } = req.body

  const schema = yup.object().shape({
    name: yup.string().required().strict()
  })

  schema
    .validate({
      name
    })
    .then(function (valid) {
      isValid = valid
    }).catch((err) => {
      message = err
    })
    .then(() => {
      if (isValid) {
        next()
      } else {
        res.send({
          error: {
            type: message.name,
            message: message.errors[0]
          }
        })
      }
    })
}

module.exports = { validationsOrigin }