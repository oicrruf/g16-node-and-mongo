/* eslint-disable camelcase */
const yup = require('yup');

const validationsCreateProduct = (req, res, next) => {
  let isValid = false;
  let message = '';

  const {
    name,
    brand,
    price,
    purchaseDate,
    purchaseReason,
    origin,
    shop,
    status,
    lifespan,
    depreciation,
    depreciationValue,
    maintenance,
    warranty,
    score,
    inSale,
    saleDate,
  } = req.body;

  const schema = yup.object().shape({
    name: yup.string().required().strict(),
    brand: yup.string().required().strict(),
    price: yup.number().required().positive(),
    purchase_date: yup.date().required(),
    purchase_reason: yup.string().required().strict(),
    origin: yup
      .string()
      .lowercase()
      .oneOf(['work', 'gift'])
      .required()
      .strict(),
    shop: yup.string().required().strict(),
    status: yup.string().required().strict(),
    lifespan: yup.number().required().positive(),
    depreciation: yup.number().required().positive(),
    depreciation_value: yup.number().required().positive(),
    maintenance: yup.number().required().positive(),
    warranty: yup.number().required().positive(),
    score: yup.number().required().min(1).max(5),
    in_sale: yup.boolean().required(),
    sale_date: yup.date(),
  });

  schema
    .validate({
      name,
      brand,
      price,
      purchaseDate,
      purchaseReason,
      origin,
      shop,
      status,
      lifespan,
      depreciation,
      depreciationValue,
      maintenance,
      warranty,
      score,
      inSale,
      saleDate,
    })
    .then((valid) => {
      isValid = valid;
    })
    .catch((err) => {
      message = err;
    })
    .then(() => {
      if (isValid) {
        next();
      } else {
        res.send({
          error: {
            type: message.name,
            message: message.errors[0],
          },
        });
      }
    });
};

module.exports = { validationsCreateProduct };
