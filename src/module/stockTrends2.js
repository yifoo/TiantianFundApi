/**
 * @api GET /stockTrends2
 * @desc 获取股票分时走势图数据
 * @desc 返回股票当日或近几日的分时走势数据，包含每分钟的价格、
 *       均价和成交量，用于绘制分时图（实时盘中走势）。
 *
 * @param {string} type    - [必填] 市场类型：1=上交所  0=深交所
 * @param {string} code    - [必填] 股票代码，例：600519
 * @param {number} [ndays] - 天数：1=今日（默认）2=近2日 5=近5日
 *
 * @returns {object} 原始接口响应
 * @returns {Array}  data.trends         - 分时数据列表
 *                   每项格式：时间,最新价,均价,成交量,成交额
 * @returns {string} data.preClose       - 昨日收盘价（计算涨跌幅用）
 *
 * @example GET /stockTrends2?type=1&code=600519
 * @example GET /stockTrends2?type=1&code=600519&ndays=5
 */
const { request } = require('../utils/index.js');

/**
 * 获取股票走势图
 */
module.exports = async (params = {}) => {
  const url = 'https://push2.eastmoney.com/api/qt/stock/trends2/get';
  return await request(url, {
    secid: `${params.type}.${params.code}`,
    fields1: 'f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f11,f12,f13',
    fields2: 'f51,f53,f56,f58',
    iscr: 0,
    iscca: 0,
    ndays: params.ndays,
    ...params,
  });
};
