const request = require('superagent');
const logger = require('superagent-logger');
const { config } = require("./config");

exports.get = (ctx) => async function get(url, query={}) {
    const res = await request
        .get(config.proxyUrl + url)
        .set('Accept', 'application/json')
        .query(query)
        .use(logger({ 
            outgoing: true,
            timestamp: true
        }));
    return resolveResult(ctx, url, res);
}

exports.post = (ctx) => async function post(url, data) {
    let pUrl = config.proxyUrl + url;
    // if (Object.keys(query).length > 0) {}
    const res = await request
        .post(pUrl)
        .send(data)
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
        .use(logger({ 
            outgoing: true,
            timestamp: true
        }));
    return resolveResult(ctx, url, res);
}

function resolveResult(ctx, url, res) {
    return new Promise((resolve, reject) => {
        if (res.status === 200) {
            let data = res.text || res.body;
            if (typeof data === 'string') {
                try {
                    data = JSON.parse(data.trim());
                } catch (e) {
                    const error = new Error(`${url}返回格式不正确`);
                    error.res = res;
                    return reject(error);
                }
            }
            if (data.code === 30333) {
                console.log(33333)
                ctx.session = null;
            }
            return resolve(data);
        } else {
            const error_1 = new Error(`${url}请求服务器出错`);
            error_1.res = res;
            return reject(error_1);
        }
    });
}