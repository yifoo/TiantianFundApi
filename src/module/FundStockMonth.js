/**
 * @api GET /FundStockMonth
 * @desc 获取基金最新披露的持仓股票明细（按月/季度）
 * @desc 返回基金最新公告期的全部持仓股票列表，包含每只股票的持仓市值、
 *       持仓比例、股票代码等信息，数据来源于基金定期报告。
 *
 * @param {string} FCODE - [必填] 基金代码，例：003834
 *
 * @returns {object}
 * @returns {number}  code              - 200 成功 / 400 失败
 * @returns {Array}   data              - 持仓股票列表
 * @returns {string}  data[].GPDM       - 股票代码
 * @returns {string}  data[].GPJC       - 股票简称
 * @returns {string}  data[].JZBL       - 占净值比例(%)
 * @returns {string}  data[].MKTCAP     - 持仓市值（元）
 * @returns {string}  data[].NEWTEXCH   - 交易所（1=上交所，0=深交所）
 * @returns {string}  data[].REPORTDATE - 报告期日期
 *
 * @example GET /FundStockMonth?FCODE=003834
 */
const { get } = require('../utils/index.js');
const { MINIAPP_HEADERS } = require('../config');

module.exports = async (params = {}) => {
  const url = 'https://fundcomapi.tiantianfunds.com/mm/FundMNewApi/FundIVInfoMultiple';

  try {
    const resp = await get(
      url,
      { ...params, plat: 'Iphone', product: 'EFund', version: '6.8.2' },
      {
        ...MINIAPP_HEADERS,
        Host: 'fundcomapi.tiantianfunds.com',
        Referer: 'https://mpservice.com/b34ccfc4ed9a4af4a4880fee485cf417/release/pages/fundHold/index',
      }
    );
    return { code: 200, data: resp.data };
  } catch (e) {
    return { code: 400, msg: e.message, data: null };
  }
};
