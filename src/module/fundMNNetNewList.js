/**
 * @api GET /fundMNNetNewList
 * @desc 获取基金列表（按基金类型分类）
 * @desc 返回指定类型下的所有基金，可用于基金分类浏览页，
 *       支持股票型、混合型、债券型、指数型等类型过滤。
 *
 * @param {string} [FundType] - 基金类型代码，不传则返回全部
 *                              常见值：1=股票型 2=混合型 3=债券型 4=指数型 6=QDII
 * @param {number} [pageIndex] - 页码，默认 1
 * @param {number} [pageSize]  - 每页条数，默认 20
 *
 * @returns {object} 原始接口响应
 * @returns {Array}  Datas              - 基金列表
 * @returns {string} Datas[].FCODE      - 基金代码
 * @returns {string} Datas[].SHORTNAME  - 基金简称
 * @returns {string} Datas[].DWJZ       - 单位净值
 * @returns {string} Datas[].RZDF       - 日涨跌幅(%)
 * @returns {number} TotalCount         - 总数量
 *
 * @example GET /fundMNNetNewList?FundType=4&pageIndex=1&pageSize=20
 */
const { request } = require('../utils/index.js');

/**
 * 获取基金列表（按类型）
 */
module.exports = async (params) => {
  const url = 'https://fundmobapi.eastmoney.com/FundMNewApi/FundMNNetNewList';
  return request(url, params);
};
