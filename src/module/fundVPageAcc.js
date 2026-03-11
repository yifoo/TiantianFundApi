/**
 * @api GET /fundVPageAcc
 * @desc 获取基金累计收益走势（与基准对比）
 * @desc 返回基金从成立以来或指定区间的累计收益走势数据，
 *       并同步返回沪深300等基准指数的同期走势，适用于走势对比图。
 *
 * @param {string} FCODE       - [必填] 基金代码，例：003834
 * @param {string} [INDEXCODE] - 对比指数代码，例：000300（沪深300）
 * @param {string} [RANGE]     - 时间范围：1M / 3M / 6M / 1Y / 3Y / 5Y / MAX
 *
 * @returns {object} 原始接口响应
 * @returns {Array}  data              - 累计收益走势
 * @returns {string} data[].FSRQ       - 日期
 * @returns {string} data[].LJJZ       - 累计净值
 * @returns {Array}  indexData         - 基准指数走势（若传 INDEXCODE）
 *
 * @example GET /fundVPageAcc?FCODE=003834&RANGE=1Y
 * @example GET /fundVPageAcc?FCODE=003834&INDEXCODE=000300&RANGE=3Y
 */
const { post } = require('../utils/index.js');

/**
 * 获取基金累计收益
 */
module.exports = async (params = {}) => {
  const url = 'https://fundcomapi.tiantianfunds.com/mm/newCore/FundVPageAcc';
  return post(url, params);
};
