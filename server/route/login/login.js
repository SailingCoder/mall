const Router = require("koa-router");
const renderVue = require("../../utils/util").renderVue;
const router = new Router({
    prefix: '/login' // 路由前缀
});

router.get("/", async (ctx, next) => {
    await renderVue(ctx);
});

module.exports = router;