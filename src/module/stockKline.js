/**
 * @api GET /stockKline
 * @desc 获取股票 K 线（历史行情）数据
 * @desc 返回指定股票在指定周期和复权方式下的 K 线数据，
 *       支持分钟线、日线、周线、月线等，适用于 K 线图渲染。
 *
 * @param {string} type  - [必填] 市场类型：1=上交所  0=深交所
 * @param {string} code  - [必填] 股票代码，例：600519
 * @param {number} klt   - [必填] K 线周期：1=1分钟 5=5分钟 15=15分钟 30=30分钟
 *                         60=60分钟 101=日线 102=周线 103=月线
 * @param {number} [fqt] - 复权类型：0=不复权（默认） 1=前复权 2=后复权
 * @param {number} [lmt] - 返回条数限制，默认 500
 * @param {string} [end] - 截止日期，格式 YYYYMMDD，不传返回最新
 *
 * @returns {object} 原始接口响应
 * @returns {Array}  data.klines        - K 线数据列表
 *                   每项格式：日期,开盘价,收盘价,最高价,最低价,成交量,成交额,振幅
 *
 * @example GET /stockKline?type=1&code=600519&klt=101&fqt=1&lmt=100
 * @example GET /stockKline?type=1&code=600519&klt=5
 */
const { request } = require('../utils/index.js');

/**
 * 获取股票k线走势图
 */
module.exports = async (params = {}) => {
  const url = 'https://push2his.eastmoney.com/api/qt/stock/kline/get';
  return await request(url, {
    secid: `${params.type}.${params.code}`,
    klt: params.klt,
    lmt: params.lmt,
    fqt: params.fqt,
    end: params.end,
    iscca: 1,
    fields1: 'f1,f2,f3,f4,f5',
    fields2: 'f51,f52,f53,f54,f55,f56,f57',
    ...params,
  });
};
