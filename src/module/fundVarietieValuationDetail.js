/**
 * @api GET /fundVarietieValuationDetail
 * @desc 获取基金实时估值明细（盘中逐分钟）
 * @desc 在交易时段返回基金盘中逐分钟估算净值，包含每个时间点的
 *       估算净值、估算涨跌幅及参考指数涨跌幅，适合净值实时跟踪图。
 *       非交易时段返回最近交易日的估值序列。
 *
 * @param {string} FCODE - [必填] 基金代码，例：470007
 *
 * @returns {Array} 解析后的估值明细列表（接口返回 JSON 字符串，内部自动解析）
 * @returns {string} [].time    - 时间点（HH:mm 格式）
 * @returns {number} [].gsz     - 当时估算净值
 * @returns {number} [].gszzl   - 当时估算涨跌幅(%)
 *
 * @example GET /fundVarietieValuationDetail?FCODE=470007
 */
const { request } = require('../utils/index.js');


module.exports = async (params = {}) => {
  const url =
    'https://fundcomapi.tiantianfunds.com/mm/fundTrade/FundValuationDetail';
  const res = await request(url, params);
  return res.data ? JSON.parse(res.data) : res.data
};
