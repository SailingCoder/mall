const Router = require("koa-router");
const auth = require("../middleware/auth");
const router = new Router();
const login = require("./login/login");

module.exports = (app, config) => {
  router.use(login.routes(), login.allowedMethods());
  
  // router.use(auth.authLogin, login.routes(), login.allowedMethods());
  app.use(router.routes());
};