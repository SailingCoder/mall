const session = require("../../middleware/session");

module.exports = {
    /**
     * 密码登录
     * @param params 
     */
    async login(ctx, data) {
        try {
            return await ctx.postRequest('/login', data).then((res) => {
                const sessname = session.slist.user;
                if (res.success) {
                    let resData = res.data;
                    session.set(ctx, sessname, resData);
                } else {
                    session.set(ctx, sessname, '')
                }
                return res
            }); 
        } catch(err) {
            console.log('service login', err)
        }
    },
    /**
     * 退出账号
     * @param params 
     */
    async logout(ctx) {
        try {
            ctx.session = null;
            return await ctx.getRequest('/logout');
        } catch(err) {
            console.log('service logout', err)
        }
    },
}