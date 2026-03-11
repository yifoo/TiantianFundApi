/**
 * @api GET /FundsValuatioNet
 * @desc 批量获取基金实时估算净值及涨跌幅（小倍养基数据源）
 * @desc 通过小倍养基 API 获取多只基金的盘中实时估值，
 *       支持自定义日期查询，适合在交易时段展示估值动态。
 *
 * @param {string} codeList - [必填] 基金代码列表，JSON 数组字符串或单个代码
 *                            例："["003834","001975"]" 或 "003834"
 * @param {string} date     - [必填] 查询日期，格式 YYYY-MM-DD，例：2024-03-08
 *
 * @returns {object} 小倍养基原始响应
 * @returns {Array}  data              - 基金估值列表
 * @returns {string} data[].code       - 基金代码
 * @returns {string} data[].name       - 基金名称
 * @returns {number} data[].gsz        - 估算净值
 * @returns {number} data[].gszzl      - 估算涨跌幅(%)
 * @returns {string} data[].gztime     - 估值更新时间
 *
 * @example GET /FundsValuatioNet?codeList=["003834","001975"]&date=2024-03-08
 */
const { xjPost } = require('../utils/index.js');
module.exports = async (params = {}) => {
  const url = `https://api.xiaobeiyangji.com/yangji-api/api/get-optional-change-nav`;
  let resp = await xjPost(url, {
    codeArr: params.codeList.includes('[') ? JSON.parse(params.codeList) : [params.codeList],
    valuationDate: params.date,
    navDate: params.date,
    isTD: true,
    version: "3.3.2.app"
  });
  return resp
};
