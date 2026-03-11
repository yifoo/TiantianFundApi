/**
 * @api GET /fundSearch
 * @desc 基金模糊搜索（支持代码、名称、拼音简拼）
 * @desc 适用于搜索框输入联想，支持基金代码（如 003834）、
 *       基金名称关键词（如 新能源）、拼音简拼（如 xny）等多种输入方式。
 *
 * @param {string} key - [必填] 搜索关键词，例：新能源 / 003834 / xny
 * @param {number} [m] - 结果数量限制，默认 10，最大 40
 *
 * @returns {object} 原始接口响应
 * @returns {Array}  Datas              - 搜索结果列表
 * @returns {string} Datas[].CODE       - 基金代码
 * @returns {string} Datas[].NAME       - 基金名称
 * @returns {string} Datas[].JP         - 拼音简拼
 *
 * @example GET /fundSearch?key=新能源&m=10
 * @example GET /fundSearch?key=003834
 */
const { request } = require('../utils/index.js');

/**
 * 基金搜索
 */
module.exports = async (params) => {
  const url =
    'https://fundsuggest.eastmoney.com/FundSearch/api/FundSearchAPI.ashx';
  return request(url, params);
};
