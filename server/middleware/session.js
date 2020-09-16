

exports.slist = {
    user: 'session_user'
};

exports.set = async (ctx, sname, data) => {
    return new Promise((resolve, reject) => {
        ctx.session[sname] = data;
        resolve({
            sname,
            sdata: ctx.session[sname]
        });
    })
    
};

exports.get = async (ctx, sname) => {
    const sdata = ctx.session[sname];
    return new Promise((resolve, reject) => {
        if (sdata) {
            resolve({
                sname,
                sdata: sdata
            });
        } else {
            reject({
                sname,
                msg: '缺少该session数据'
            })
        }
    })
};