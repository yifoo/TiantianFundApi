/*
 * @Author: wuhao 
 * @Date: 2025-11-26 07:33:04 
 * @Desc: 获取实时基金指数流数据
 * @Last Modified by: wuhao
 * @Last Modified time: 2025-11-26 07:33:28
 */
const { sse } = require('../utils/index.js');

module.exports = async (params = {}, ctx) => {

    ctx.request.socket.setTimeout(0);
    ctx.request.socket.setNoDelay(true);
    ctx.request.socket.setKeepAlive(true);
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
    ctx.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept');
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
    }, { ...ctx.headers, host: 'push2.eastmoney.com', referer: 'https://mpservice.com/b34ccfc4ed9a4af4a4880fee485cf417/release/pages/fundHold/index', "User-Agent": 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36' });
    return res
};

// secids 表示股票代码，可以是多个，用逗号分隔
