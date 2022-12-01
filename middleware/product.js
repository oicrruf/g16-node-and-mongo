const yup = require('yup')

const validationsProducts = (req, res, next) => {
  let isValid = false
  let message = ''

  const {
    name,
    brand,
    price,
    purchase_date,
    purchase_reason,
    origin,
    shop,
    status,
    lifespan,
    depreciation,
    depreciation_value,
    maintenance,
    warranty,
    score,
    in_sale,
    sale_date
  } = req.body

  const schema = yup.object().shape({
    name: yup.string().required().strict(),
    brand: yup.string().required().strict(),
    price: yup.number().required().positive(),
    purchase_date: yup.date().required(),
    purchase_reason: yup.string().required().strict(),
    origin: yup.string().lowercase().oneOf(['work', 'gift']).required().strict(),
    shop: yup.string().required().strict(),
    status: yup.string().required().strict(),
    lifespan: yup.number().required().positive(),
    depreciation: yup.number().required().positive(),
    depreciation_value: yup.number().required().positive(),
    maintenance: yup.number().required().positive(),
    warranty: yup.number().required().positive(),
    score: yup.number().required().min(1).max(5),
    in_sale: yup.boolean().required(),
    sale_date: yup.date()
  })

  schema
    .validate({
      name,
      brand,
      price,
      purchase_date,
      purchase_reason,
      origin,
      shop,
      status,
      lifespan,
      depreciation,
      depreciation_value,
      maintenance,
      warranty,
      score,
      in_sale,
      sale_date
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

module.exports = { validationsProducts }
