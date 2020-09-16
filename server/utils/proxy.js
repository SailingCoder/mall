
const httpProxy = require('http-proxy');
const proxy = httpProxy.createProxyServer({});

proxy.on("error", (err, req, res, target) => {
    console.error(err);
});

proxy.on('proxyReq', function (proxyReq, req, res, options) {
  if (req.body) {
    console.log('proxyReq', proxyReq)
    // let bodyData = JSON.stringify(req.body)
    // // incase if content-type is application/x-www-form-urlencoded -> we need to change to application/json
    // proxyReq.setHeader('Content-Type', 'application/json')
    // proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData))
    // // stream the content
    // proxyReq.write(bodyData)
  }
})

proxy.on("proxyRes", (proxyRes, req, res) => {
    const requestUrl = req.url;
    if(requestUrl.startsWith("/redirect")){
      res.statusCode = 302;
      const username = escape(req.username);
      const userCookie = `user_name=${username};path=/;`;
      res.setHeader("set-cookie", [userCookie , proxyRes.headers["set-cookie"]]);
      res.setHeader("Location","/");
      res.end();
    }
});

exports.proxy = (proxyUrl) => async (ctx, next) => {
    const requestUrl = ctx.request.url;
    if(requestUrl.startsWith("/mallapi") || requestUrl.startsWith("/redirect")){
      if(requestUrl.startsWith("/redirect")){
        ctx.req.username = ctx.query.business_user_name;
        ctx.req.context = ctx;
      }
      console.log("进入代理", requestUrl);
      return new Promise((resolve, reject) => {
        proxy.web(ctx.req, ctx.res, { target: proxyUrl, changeOrigin: true, cookieDomainRewrite:true},(err)=>{
          if(err){
            reject(err);
            return;
          }
          resolve(err);
        });
      });
    }else{
      await next();
    }
}
