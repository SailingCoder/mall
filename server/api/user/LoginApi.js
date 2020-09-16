const Router = require("koa-router");
const LoginService = require("../../service/user/LoginService");
const router = new Router({
    prefix: '/user' // 路由前缀
});

router.post("/login", async (ctx, next) => {
    try {
        let body = ctx.request.body;
        await LoginService.login(ctx, body).then((res) => {
            ctx.body = res;
        });
    } catch(err) {
        console.log('api login', err)
    }
});


router.get("/logout", async (ctx, next) => {
    try {
        await LoginService.logout(ctx).then((res) => {
            ctx.body = res;
        });
    } catch(err) {
        console.log('api logout', err)
    }
});

module.exports = router;