/**
 * @api GET /bigDataList
 * @desc 获取大数据榜单列表
 * @desc 返回天天基金 App 首页大数据模块的所有榜单入口，
 *       包含人气榜、资金流入榜、上涨概率榜等，可获取榜单 ID 供后续查询详情。
 *
 * @param {object} params - 无必传参数
 *
 * @returns {object} 原始接口响应
 * @returns {Array}  data          - 榜单列表
 * @returns {string} data[].id     - 榜单 ID
 * @returns {string} data[].title  - 榜单名称
 *
 * @example GET /bigDataList
 */
const { request } = require('../utils/index.js');

/**
 * 获取大数据榜单
 */
module.exports = async (params = {}) => {
  const url = 'https://appconfig2.1234567.com.cn/config/BigDataList';
  return request(url, params);
};
