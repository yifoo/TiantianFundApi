/**
 * @api GET /fundMNDetailInformation
 * @desc 获取基金详情信息（含申购费率）
 * @desc 聚合两个接口：基金详情页核心信息（名称、净值、评级、规模等）
 *       和该基金在平台的申购费率，适合基金详情页首屏渲染。
 *
 * @param {string} fcode  - [必填] 基金代码（小写），例：003834
 * @param {string} [RLEVEL_SZ] - 晨星评级过滤
 *
 * @returns {object} 基金详情接口响应（Datas 字段）+ 额外拼入费率
 * @returns {object} Datas              - 基金基本信息
 * @returns {string} Datas.FCODE        - 基金代码
 * @returns {string} Datas.SHORTNAME    - 基金简称
 * @returns {string} Datas.DWJZ         - 单位净值
 * @returns {string} Datas.LJJZ         - 累计净值
 * @returns {string} Datas.RZDF         - 日涨跌幅(%)
 * @returns {string} Datas.ENDNAV       - 基金规模（元）
 * @returns {Array}  Datas.sh           - 申购费率档位列表（从 FundRateInfo 拼入）
 *
 * @example GET /fundMNDetailInformation?fcode=003834
 */
const { request } = require('../utils/index.js');

/**
 * 获取基金详情
 */
module.exports = async (params) => {
  const url =
    'https://fundmobapi.eastmoney.com/FundMNewApi/FundMNDetailInformation';

  const url2 = 'https://fundcomapi.tiantianfunds.com/mm/fundTrade/FundRateInfo';
  params.FCODE = params.fcode
  params.plat = 'Iphone'
  let resp = await request(url, params)
  let resp2 = await request(url2, params)
  resp.Datas.sh = resp2.data.sh
  return resp
};
