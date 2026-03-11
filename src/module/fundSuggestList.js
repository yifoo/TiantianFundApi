/**
 * @api GET /fundSuggestList
 * @desc 获取全量基金简要列表（JSONP）
 * @desc 返回所有在售基金的最简列表（仅含代码和名称），
 *       体积小、适合本地缓存，可作为搜索的本地候选词库。
 *       数据以 JSONP 格式返回，接口内部自动解析。
 *
 * @param {object} params - 无需传入参数
 *
 * @returns {Array} 基金简要列表，每项为 [代码, 简称, 拼音] 的数组
 *
 * @example GET /fundSuggestList
 */
const { jsonp } = require('../utils/index.js');

/**
 * 获取基金列表(所有-简单)
 */
module.exports = async () => {
  const url = 'https://m.1234567.com.cn/data/FundSuggestList.js';
  return jsonp(url, 'FundSuggestList');
};
