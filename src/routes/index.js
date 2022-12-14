const health = require('./health');
const brand = require('./brand');
const origin = require('./origin');
const product = require('./product');
const purchaseReason = require('./purchase-reason');
const shop = require('./shop');
const user = require('./user');
const auth = require('./auth');
const privateRoutes = require('./private-routes');

module.exports = {
  health,
  brand,
  origin,
  product,
  purchaseReason,
  shop,
  user,
  auth,
  privateRoutes,
};
