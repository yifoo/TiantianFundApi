const { sse } = require('../utils/index.js');

/**
 * 获取股票详情
 */
module.exports = async (params = {}, ctx) => {

    ctx.request.socket.setTimeout(0);
    ctx.request.socket.setNoDelay(true);
    ctx.request.socket.setKeepAlive(true);

    ctx.set('Content-Type', 'text/event-stream; charset=utf-8');
    ctx.set('Cache-Control', 'no-cache');
    ctx.set('Connection', 'keep-alive');

    let res = await sse('https://push2.eastmoney.com/api/qt/ulist/sse', {
        "fltt": "2",
        "secids": params.secids,
        "fields": params.fields,
        "dpt": "jj.hqpush",
        "pn": "1",
        "pz": "100"
    }, { ...ctx.headers, host: 'push2.eastmoney.com', referer: 'https://mpservice.com/b34ccfc4ed9a4af4a4880fee485cf417/release/pages/fundHold/index', "User-Agent": "EMProjJijin/1085 CFNetwork/1498.700.2.1.1 Darwin/23.6.0" });
    return res
};

// secids 表示股票代码，可以是多个，用逗号分隔
