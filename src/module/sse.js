/**
 * @api GET /sse
 * @desc 订阅指数/股票实时行情推送（SSE 长连接）
 * @desc 建立 Server-Sent Events 长连接，持续接收东方财富行情推送数据，
 *       客户端通过 EventSource 监听数据流，适合实时行情看板场景。
 *       连接建立后服务端会持续推送，客户端断开时连接自动关闭。
 *
 * @param {string} secids  - [必填] 行情代码列表，格式 "市场.代码"，逗号分隔
 *                           例："1.000001,0.399001"（上证+深证）
 * @param {string} [fields] - 订阅字段，例："f1,f2,f3,f12,f14"
 *                           f2=最新价 f3=涨跌幅% f12=代码 f14=名称
 *
 * @returns {Stream} SSE 数据流（text/event-stream）
 *          每条推送格式：data: { "data": { "diff": [...] } }
 *          diff 中各对象字段含义同 marketIndex 接口
 *
 * @example
 *   // 浏览器端使用
 *   const es = new EventSource('/sse?secids=1.000001,0.399001&fields=f2,f3,f12,f14');
 *   es.onmessage = (e) => console.log(JSON.parse(e.data));
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
