/**
 * @api GET /FundCoreDiyNew
 * @desc 批量获取自选基金的持仓净值及涨跌幅
 * @desc 一次性拉取多只基金的核心净值数据，常用于自选基金列表页展示，
 *       返回字段包含基金名称、单位净值、累计净值、日涨幅、申购状态等。
 *
 * @param {string} FCODES - 基金代码列表，逗号分隔，例：003834,001975
 *
 * @returns {object} 原始接口响应（含 data 数组）
 * @returns {string} data[].FCODE      - 基金代码
 * @returns {string} data[].SHORTNAME  - 基金简称
 * @returns {string} data[].DWJZ       - 单位净值
 * @returns {string} data[].LJJZ       - 累计净值
 * @returns {string} data[].RZDF       - 日涨跌幅(%)
 * @returns {string} data[].FSRQ       - 净值日期
 * @returns {string} data[].ISBUY      - 是否可申购（1 可以 / 0 不可）
 * @returns {string} data[].FTYPE      - 基金类型
 *
 * @example GET /FundCoreDiyNew?FCODES=003834,001975
 */
const { post } = require('../utils/index.js');

/**
 * 获取基金持仓净值及幅度
 */
module.exports = async (params = {}) => {
  const url = `https://fundcomapi.tiantianfunds.com/mm/newCore/FundCoreDiyNew`;
  params.FIELDS = "SHORTNAME,RZDF,DWJZ,LJJZ,FSRQ,ISBUY,FTYPE,FCODE"
  let resp = await post(url, params);
  return resp
};
