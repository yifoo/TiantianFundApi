/**
 * @api GET /FundSaleRateInfo
 * @desc 获取基金申购费率信息
 * @desc 查询指定基金在天天基金平台的销售费率，包含各档位申购金额对应的
 *       原始费率、优惠费率及折扣力度，用于费用测算和费率展示。
 *
 * @param {string} fcode - [必填] 基金代码，例：003834
 *
 * @returns {object} 原始接口响应
 * @returns {Array}  data.sh          - 费率档位列表
 * @returns {string} data.sh[].SH     - 申购金额档位描述
 * @returns {string} data.sh[].RATE   - 原始费率
 * @returns {string} data.sh[].DERATE - 优惠费率（折扣后）
 *
 * @example GET /FundSaleRateInfo?fcode=003834
 */
const { request } = require('../utils/index.js');

/**
 * 获取大数据榜单
 */
module.exports = async (params = {}) => {
  const url = 'https://fundcomapi.tiantianfunds.com/mm/fundTrade/FundRateInfo';
  params.FCODE = params.fcode
  params.plat = 'Iphone'
  params.product = 'EFund'
  return request(url, params);
};
