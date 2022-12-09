const express = require('express');
const packageJSN = require('../../package.json');

const router = express.Router();

/* GET home page. */
router.get('/health', (req, res) => {
  const { name, version } = packageJSN;
  res.send({
    name,
    version,
  });
});

module.exports = router;
