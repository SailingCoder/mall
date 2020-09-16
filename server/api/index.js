const Router = require("koa-router");
const router = new Router();
const auth = require("../middleware/auth");
const LoginApi = require("./user/LoginApi");

module.exports = (app, config) => {
  router.use(LoginApi.routes(), LoginApi.allowedMethods());

  // router.use(auth.authLogin, LoginApi.routes(), LoginApi.allowedMethods());
  app.use(router.routes());
  // 解决跨域问题
  // app.use(async (ctx, next) => {
  //   ctx.set('Access-Control-Allow-Origin', '*');
  //   ctx.set('Access-Control-Allow-Headers', '*');
  //   ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  //   ctx.set('Cache-Control', 'no-cache');
  //   await next();
  // });
};