const yup = require('yup')

const validationsProducts = (req, res, next) => {
  let isValid = false
  let message = ''

  const {
    id,
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
    id: yup.number().required(),
    name: yup.string().required(),
    brand: yup.string().required(),
    price: yup.number().required().positive(),
    purchase_date: yup.date().required(),
    purchase_reason: yup.string().required(),
    origin: yup.string().lowercase().oneOf(['work', 'gift']).required(),
    shop: yup.string().required(),
    status: yup.string().required(),
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
      id,
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
        res.send({
          id,
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

module.exports = { validationsProducts }
