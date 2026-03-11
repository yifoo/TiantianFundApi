/**
 * @api GET /fundNetList
 * @desc 获取基金字母索引列表
 * @desc 返回按首字母分组的基金列表，常用于字母导航筛选场景。
 *
 * @param {string} [Letter] - 字母过滤，例：A / B / Z，不传返回全部
 * @param {number} [pageIndex] - 页码，默认 1
 * @param {number} [pageSize]  - 每页条数，默认 20
 *
 * @returns {object} 原始接口响应
 * @returns {Array}  Datas              - 基金列表
 * @returns {string} Datas[].FCODE      - 基金代码
 * @returns {string} Datas[].SHORTNAME  - 基金简称
 * @returns {number} TotalCount         - 总数量
 *
 * @example GET /fundNetList?Letter=A&pageIndex=1
 */
const { request } = require('../utils/index.js');

/**
 * 获取基金列表（按字母）
 */
module.exports = async (params) => {
  const url = 'https://fundmobapi.eastmoney.com/FundMApi/FundNetList.ashx';
  return request(url, params);
};
