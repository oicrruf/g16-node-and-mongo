const yup = require('yup')

const validationsUser = (req, res, next) => {
  let isValid = false
  let message = ''

  const {
    id,
    first_name,
    last_name,
    email,
    password,
    gender_id
  } = req.body

  const schema = yup.object().shape({
    id: yup.number().required(),
    first_name: yup.string().required(),
    last_name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required().min(8).matches([a-zA-Z]),
    gender_id: yup.number().required()
  })

  schema
    .validate({
        id,
        first_name,
        last_name,
        email,
        password,
        gender_id
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
            first_name,
            last_name,
            email,
            password,
            gender_id
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

module.exports = { validationsUser }