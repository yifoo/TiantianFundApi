/**
 * @api GET /fundMNHKRank
 * @desc 获取香港互认基金排行榜
 * @desc 返回在内地天天基金平台销售的香港互认基金排行，
 *       支持按收益率、规模等多维度排序。
 *
 * @param {string} [FundType]   - 基金类型过滤，默认返回全部
 * @param {string} [SortColumn] - 排序字段，例：SYL_1N（近1年）
 * @param {string} [Sort]       - 排序方向：desc（降序）/ asc（升序）
 * @param {number} [pageIndex]  - 页码，从 1 开始，默认 1
 * @param {number} [pageSize]   - 每页条数，默认 20
 *
 * @returns {object} 原始接口响应
 * @returns {Array}  Datas              - 基金排行列表
 * @returns {string} Datas[].FCODE      - 基金代码
 * @returns {string} Datas[].SHORTNAME  - 基金简称
 * @returns {string} Datas[].SYL_1N     - 近1年收益率(%)
 * @returns {number} Datas[].allRecords - 总记录数
 *
 * @example GET /fundMNHKRank?SortColumn=SYL_1N&Sort=desc&pageIndex=1&pageSize=20
 */
const { request } = require('../utils/index.js');

/**
 * 获取基金排行(香港)
 */
module.exports = async (params = {}) => {
  const url = 'https://fundmobapi.eastmoney.com/FundMNewApi/FundMNHKRank';
  return request(url, params);
};
