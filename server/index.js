
const Koa = require('koa')
const consola = require('consola')
const static = require('koa-static');
const koaBody = require("koa-body");
const path = require('path');
const { Nuxt, Builder } = require('nuxt');
const session = require("koa-session2");

const { setConfig } = require("./utils/config");
const { proxy } = require("./utils/proxy.js");
const request = require("./utils/request");
const route = require("./route");
const api = require("./api");

const app = new Koa();
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3001;
let config = require('../nuxt.config.js')
config.dev = !(app.env === 'production' || app.env === 'test')
const proxyUrl = config.dev ? config.proxyUrl.dev : config.proxyUrl[app.env]

setConfig('proxyUrl', proxyUrl);
console.log(app.env);

app.use(koaBody({
  multipart:true,  
  formLimit:"50mb",
  jsonLimit:"50mb",
  formidable: {
    // uploadDir:path.join(__dirname,'public/upload/'), // 设置文件上传目录
    keepExtensions: true,    // 保持文件的后缀
    maxFileSize: 50000*1024*1024,
    onFileBegin:(name,file) => { // 文件上传前的设置
      // console.log(`name: ${name}`);
      // console.log(file);
    }
  }
}));

app.keys = ['session']
app.use(session({
  key: "session",
  maxAge: 86400000,
  overwrite: true,
  autoCommit: true,
  httpOnly: true,
  signed: true,
  rolling: false,
  renew: false,
}), app);

async function start() {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  app.use(async (ctx, next) => {
    ctx.req.session = ctx.session
    ctx.getRequest = request.get(ctx);
    ctx.postRequest = request.post(ctx);
    await next();
  })

  app.use(proxy(proxyUrl));

  app.use(async (ctx, next) => {
    ctx.nuxt = nuxt;
    ctx.res.body = {};
    await next();
  });

  route(app, config);
  api(app, config);
  
  app.use(async (ctx, next) => {
    ctx.status = 200;
    return new Promise((resolve, reject) => {
      ctx.res.on('close', resolve)
      ctx.res.on('finish', resolve)
      nuxt.render(ctx.req, ctx.res, promise => {
        promise.then(resolve).catch(reject)
      })
    })
  })
  app.listen(port)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
if (config.dev) {
  app.use(static(path.join(__dirname , '../static')));
}else{
  app.use(static(path.join(__dirname , '../static'),{
    gzip: true,
    maxAge:604800
  }));
}

start();