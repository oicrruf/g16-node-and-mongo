const yup = require("yup");

const validationsPurchaseReason = (req, res, next) => {
  
  let isValid = false;
  let message = "";

  const { name } = req.body;

  const schema = yup.object().shape({
    name: yup.string().required(),
  });

  schema
    .validate({
      name
    })
    .then(function (valid) {
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
        next();
      }
    });
};

module.exports = { validationsPurchaseReason };
