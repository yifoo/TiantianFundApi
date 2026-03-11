/**
 * @api GET /fundVPageDiagram
 * @desc 获取基金单位净值走势数据
 * @desc 返回基金历史每日单位净值，可指定时间范围，
 *       主要用于绘制基金详情页的净值走势折线图。
 *
 * @param {string} FCODE   - [必填] 基金代码，例：003834
 * @param {string} [RANGE] - 时间范围：1M / 3M / 6M / 1Y / 3Y / 5Y / MAX
 *
 * @returns {object} 原始接口响应
 * @returns {Array}  data              - 净值走势列表
 * @returns {string} data[].FSRQ       - 净值日期
 * @returns {string} data[].DWJZ       - 单位净值
 *
 * @example GET /fundVPageDiagram?FCODE=003834&RANGE=1Y
 */
const { post } = require('../utils/index.js');

/**
 * 获取基金净值
 */
module.exports = async (params = {}) => {
  const url =
    'https://fundcomapi.tiantianfunds.com/mm/newCore/FundVPageDiagram';
  return post(url, params);
};
