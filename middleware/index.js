const validations = (req, res, next) => {
  console.log(req.body)
  next()
}

module.exports = {validations}