/**
 * @api GET /bigDataDetail
 * @desc 获取大数据榜单详情
 * @desc 返回指定大数据榜单的详细内容（如热门搜索、资金流入榜等），
 *       可结合 bigDataList 接口获取榜单 ID 后再调用此接口获取明细。
 *
 * @param {string} [id] - 榜单 ID，从 bigDataList 接口返回结果中获取
 *
 * @returns {object} 原始接口响应（结构随榜单类型不同而变化）
 *
 * @example GET /bigDataDetail?id=xxx
 */
const { request } = require('../utils/index.js');

/**
 * 获取大数据榜单数据详情
 */
module.exports = async (params = {}) => {
  const url = 'https://appconfig2.1234567.com.cn/config/BigDatadetail';
  return request(url, params);
};
