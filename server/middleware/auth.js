

module.exports = {
    async authLogin(ctx, next){
        try {
            // console.log('auth ctx -------------')
        } catch (error) {
            // console.error(error);
        }
        await next();
    }
}