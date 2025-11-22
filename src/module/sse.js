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

    let res = await sse('/api/qt/ulist/sse', {
        "fltt": "2",
        "secids": params.secids,
        "fields": params.fields,
        "dpt": "jj.hqpush",
        "pn": "1",
        "pz": "100"
    });
    return res
};

// secids 表示股票代码，可以是多个，用逗号分隔
