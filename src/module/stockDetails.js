/**
 * @api GET /stockDetails
 * @desc 获取股票逐笔成交明细
 * @desc 返回指定股票最近 N 笔逐笔成交记录，包含成交时间、价格、
 *       成交量、成交额及买卖方向，适用于成交明细面板展示。
 *
 * @param {string} type - [必填] 市场类型：1=上交所  0=深交所
 * @param {string} code - [必填] 股票代码（不含市场前缀），例：600519
 * @param {number} [pos] - 起始位置，负数表示最后 N 笔，默认 -14
 *
 * @returns {object} 原始接口响应
 * @returns {Array}  data.details        - 逐笔成交列表
 * @returns {string} data.details[].time - 成交时间
 * @returns {string} data.details[].price - 成交价格
 * @returns {string} data.details[].vol  - 成交量（手）
 * @returns {string} data.details[].bs   - 买卖方向：B=买入 S=卖出
 *
 * @example GET /stockDetails?type=1&code=600519
 */
const { request } = require('../utils/index.js');

/**
 * 获取股票交易明细
 */
module.exports = async (params = {}) => {
  const url = 'https://push2.eastmoney.com/api/qt/stock/details/get';
  return await request(url, {
    secid: `${params.type}.${params.code}`,
    fields1: 'f1,f2,f3,f4,f5',
    fields2: 'f51,f52,f53,f54,f55',
    pos: '-14',
    iscca: 1,
    invt: 2,
    ...params,
  });
};
