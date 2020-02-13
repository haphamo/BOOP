const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(proxy('/api/*', { target: 'https://localhost:3001', secure: false,
  changeOrigin: true }));
};
