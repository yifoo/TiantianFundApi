/**
 * @api GET /getNetNav
 * @desc 批量获取基金收益数据（小倍养基数据源）
 * @desc 通过小倍养基 API 获取指定日期多只基金的收益情况，
 *       支持历史日期查询，适合自选基金的日收益统计展示。
 *
 * @param {string} codeList - [必填] 基金代码 JSON 数组字符串，例：["003834","001975"]
 * @param {string} date     - [必填] 查询日期，格式 YYYY-MM-DD，例：2024-03-08
 *
 * @returns {object} 小倍养基原始响应
 * @returns {Array}  data              - 各基金收益数据
 * @returns {string} data[].code       - 基金代码
 * @returns {string} data[].name       - 基金名称
 * @returns {number} data[].gain       - 当日收益额（元）
 * @returns {number} data[].gainRatio  - 当日收益率(%)
 *
 * @example GET /getNetNav?codeList=["003834","001975"]&date=2024-03-08
 */
const { xjPost } = require('../utils/index.js');
module.exports = async (params = {}) => {
  const url = `https://api.xiaobeiyangji.com/yangji-api/api/get-gains`
  let resp = await xjPost(url, {
    codeArr: JSON.parse(params.codeList),
    date: params.date,
    "unionId": "o896o5zJdSAcXOdHps",
    "dataResources": "4",
    "dataSourceSwitch": true,
    "version": "3.4.1.X"
  });
  return resp
};
