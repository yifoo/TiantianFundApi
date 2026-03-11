/**
 * @api GET /getFundIndex
 * @desc 获取基金关联指数列表
 * @desc 返回所有可用于基金净值对比的参考指数，包含指数代码、名称
 *       和指数行情数据，常用于指数选择器或基金业绩归因分析。
 *
 * @param {object} params - 无需传入参数
 *
 * @returns {object}
 * @returns {number} code              - 200 成功 / 500 失败
 * @returns {string} msg               - 结果描述
 * @returns {Array}  data              - 指数列表
 * @returns {string} data[].INDEXCODE  - 指数代码
 * @returns {string} data[].INDEXNAME  - 指数名称
 * @returns {string} data[].INDEXQP    - 指数行情（最新涨跌幅等）
 *
 * @example GET /getFundIndex
 */
const { request } = require('../utils/index.js');

module.exports = async (params = {}) => {
  const url = `https://fundcomapi.tiantianfunds.com/mm/FundSubject/FundBaseInfos`;
  try {
    let resp = await request(url, { FIELDS: 'INDEXCODE,INDEXNAME,INDEXQP' });
    return {
      code: 200,
      data: resp.data,
      msg: '获取基金指数成功'
    }
  } catch (e) {
    return {
      code: 500,
      msg: '获取基金指数失败'
    }
  }
};
