/**
 * @api GET /FundsNewNet
 * @desc 批量获取自选基金净值及收益率（含实时估值）
 * @desc 适用于基金持仓列表/自选列表页，一次性返回多只基金的：最新净值、
 *       实时估值（盘中）、各阶段收益率（日/周/月/年/成立以来），
 *       以及申购状态、资金流向等信息。
 *
 * @param {string} FCODES - [必填] 基金代码列表，逗号分隔，例：003834,001975,110003
 *
 * @returns {object} 原始接口响应
 * @returns {Array}  data              - 基金净值信息列表
 * @returns {string} data[].FCODE      - 基金代码
 * @returns {string} data[].SHORTNAME  - 基金简称
 * @returns {string} data[].NAV        - 最新单位净值
 * @returns {string} data[].ACCNAV     - 最新累计净值
 * @returns {string} data[].NAVCHGRT   - 最新净值涨跌幅(%)
 * @returns {string} data[].GSZ        - 盘中估算净值
 * @returns {string} data[].GSZZL      - 盘中估算涨跌幅(%)
 * @returns {string} data[].GZTIME     - 估值更新时间
 * @returns {string} data[].SYL_1N     - 近1年收益率(%)
 * @returns {string} data[].SYL_3N     - 近3年收益率(%)
 * @returns {string} data[].ISBUY      - 是否可申购
 * @returns {string} data[].ZJL        - 资金流入（元）
 *
 * @example GET /FundsNewNet?FCODES=003834,001975
 */
const { post } = require('../utils/index.js');

module.exports = async (params = {}) => {
  const url = `https://fundcomapi.tiantianfunds.com/mm/FundFavor/FundFavorInfo`;
  params.FIELDS = "ISBUY,MAXSG,FCODE,SHORTNAME,PDATE,NAV,ACCNAV,NAVCHGRT,NAVCHGRT100,GSZ,GSZZL,GZTIME,CHANGERATIO,ZJL,SYL_Z,SYL_Y,SYL_3Y,SYL_6Y,SYL_JN,SYL_1N,SYL_2N,SYL_3N,SYL_5N,SYL_LN,RSBTYPE,RSFUNDTYPE,SYRQ,INDEXCODE,NEWINDEXTEXCH"
  params.pageIndex = 1
  params.pageSize = 10000
  params.plat = 'Iphone'
  let resp = await post(url, params);
  return resp
};
