const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(proxy('/api/pets', { target: 'http://localhost:3001' }));
};
