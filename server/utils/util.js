function renderVue(ctx){
    ctx.status = 200;
    return new Promise((resolve, reject) => {
        ctx.res.on('close', resolve)
        ctx.res.on('finish', resolve)
        ctx.nuxt.render(ctx.req, ctx.res, promise => {
            promise.then(resolve).catch(reject);
        })
    })
}

function renderRouteVue(route, ctx){
    ctx.status = 200;
    return new Promise((resolve, reject) => {
        ctx.res.on('close', resolve)
        ctx.res.on('finish', resolve)
        ctx.nuxt.renderRoute(route, {req:ctx.req, res:ctx.res})
        .then(({ html, error, redirected }) => {
            if(error){
                reject(error);
                return;
            }
            resolve(html);
        });
    })
}
exports.renderVue = renderVue;
exports.renderRouteVue = renderRouteVue;