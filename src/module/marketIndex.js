/**
 * @api GET /marketIndex
 * @desc 获取市场指数实时行情（沪深指数等）
 * @desc 返回指定证券代码的实时行情数据，支持多个指数同时查询。
 *       秒级更新，适用于首页行情看板、指数走势监控等场景。
 *
 * @param {string} secids - [必填] 指数代码列表，格式为 "市场.代码"，多个逗号分隔
 *                          上交所前缀 1，深交所前缀 0
 *                          例："1.000001,0.399001" 表示上证指数+深证成指
 * @param {string} [fields] - 返回字段，例："f1,f2,f3,f12,f14"（不传返回全量）
 *
 * @returns {object}
 * @returns {number} code       - 200 成功 / 400 失败
 * @returns {string} msg        - 结果描述
 * @returns {object} data       - 行情数据对象
 * @returns {Array}  data.diff  - 各指数行情列表
 *                   f2 = 最新价  f3 = 涨跌幅%  f4 = 涨跌额
 *                   f12 = 代码   f14 = 名称
 *
 * @example GET /marketIndex?secids=1.000001,0.399001,0.399006
 */
const { get } = require('../utils/index.js');

module.exports = async (params = {}) => {
  const url = 'https://push2.eastmoney.com/api/qt/ulist.np/get';

  const queryParams = {
    ...params,
    dpt: 'jj.hqpush',
    fltt: 2,
    pn: 1,
    pz: 100,
  };

  const header = {
    'Accept-Encoding': 'gzip',
    'Content-Type': 'application/x-www-form-urlencoded',
    tracestate: 'pid=0x14ae0b310,taskid=0x6000004c6580',
    Host: 'push2.eastmoney.com',
    Referer: 'https://quote.eastmoney.com/center/qqzs.html',
  };

  try {
    const res = await get(url, queryParams, header);
    if (res.code === 200) {
      return { code: 200, msg: '获取指数成功', data: res.data.data };
    }
    return { code: 400, msg: '抓取失败', data: null };
  } catch (e) {
    return { code: 400, msg: '抓取失败', data: null };
  }
};
