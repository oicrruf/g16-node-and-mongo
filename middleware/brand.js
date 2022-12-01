const yup = require('yup')

const validationsBrand = (req, res, next) => {
  
  let isValid = false
  let message = ''

  const { name, description } = req.body

  const schema = yup.object().shape({
    name: yup.string().required().strict(),
    description: yup.string().required().strict()
  })

  schema
    .validate({
      name,
      description
    })
    .then(function (valid) {
      isValid = valid
    })
    .catch((err) => {
      message = err
    })
    .then(() => {
      if (isValid) {
        next()
      } else {
        res.send({
          error: {
            type: message.name,
            message: message.errors
          }
        })
      }
    })
}

module.exports = { validationsBrand }