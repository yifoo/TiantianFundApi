/**
 * @api GET /fundMNRank
 * @desc 获取基金排行榜（A股市场）
 * @desc 返回天天基金网基金排行榜数据，支持按类型过滤和多种维度排序，
 *       是展示基金排行的主要接口。
 *
 * @param {string} [FundType]    - 基金类型代码（同 fundMNNetNewList）
 * @param {string} [SortColumn]  - 排序字段，例：SYL_1N（近1年）、DWJZ（净值）
 * @param {string} [Sort]        - 排序方向：desc / asc
 * @param {number} [pageIndex]   - 页码，默认 1
 * @param {number} [pageSize]    - 每页条数，默认 20
 *
 * @returns {object} 原始接口响应
 * @returns {Array}  Datas              - 基金排行列表
 * @returns {string} Datas[].FCODE      - 基金代码
 * @returns {string} Datas[].SHORTNAME  - 基金简称
 * @returns {string} Datas[].DWJZ       - 单位净值
 * @returns {string} Datas[].LJJZ       - 累计净值
 * @returns {string} Datas[].RZDF       - 日涨跌幅(%)
 * @returns {string} Datas[].SYL_1N     - 近1年收益率(%)
 * @returns {number} allRecords         - 总记录数
 *
 * @example GET /fundMNRank?FundType=1&SortColumn=SYL_1N&Sort=desc&pageIndex=1
 */
const { request } = require('../utils/index.js');

/**
 * 获取基金排行
 */
module.exports = async (params = {}) => {
  const url = 'https://fundmobapi.eastmoney.com/FundMNewApi/FundMNRank';
  return request(url, params);
};
