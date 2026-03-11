/**
 * @api GET /fundSearchInfoByName
 * @desc 按基金名称关键词搜索基金（带分页）
 * @desc 与 fundSearch 相比，此接口支持分页并返回更丰富的字段，
 *       适用于搜索结果页的完整展示（含净值、规模、经理等信息）。
 *
 * @param {string} key        - [必填] 搜索关键词，例：华夏
 * @param {string} [orderType] - 排序方式：1=综合 2=净值 3=规模 4=成立日期
 * @param {number} [pageindex] - 页码，从 1 开始，默认 1
 * @param {number} [pagesize]  - 每页条数，默认 20
 *
 * @returns {object} 原始接口响应
 * @returns {Array}  list               - 搜索结果基金列表
 * @returns {string} list[].FCODE       - 基金代码
 * @returns {string} list[].SHORTNAME   - 基金简称
 * @returns {string} list[].DWJZ        - 单位净值
 * @returns {string} list[].ENDNAV      - 基金规模（元）
 * @returns {number} totalCount         - 命中总数
 *
 * @example GET /fundSearchInfoByName?key=华夏&orderType=2&pageindex=1&pagesize=20
 */
const { request } = require('../utils/index.js');

/**
 * 以基金名称搜索
 */
module.exports = async (params) => {
  const url = 'https://fundts.eastmoney.com/search/s/fundinfobynohigh';
  return request(url, params);
};
