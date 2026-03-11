/**
 * @api GET /guessInfo
 * @desc 判断当日是否为交易日及获取估算相关配置
 * @desc 通过小倍养基接口返回当日的交易日状态信息，
 *       以及估算净值相关的日期配置，适合前端判断是否展示盘中估值组件。
 *
 * @param {object} params - 无需传入参数
 *
 * @returns {object} 小倍养基原始响应
 * @returns {boolean} data.isTradingDay  - 当日是否为交易日
 * @returns {string}  data.valuationDate - 当日估算日期
 * @returns {string}  data.navDate       - 最新净值日期
 *
 * @example GET /guessInfo
 */
const { xjPost } = require('../utils/index.js');
module.exports = async (params = {}) => {
  const url = `https://uni-fundts.1234567.com.cn/forecast/ssec/guessinfo`
  let resp = await xjPost(url);
  return resp
};
