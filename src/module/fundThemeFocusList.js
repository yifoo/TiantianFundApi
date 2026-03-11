/**
 * @api GET /fundThemeFocusList
 * @desc 获取主题焦点聚合列表
 * @desc 返回当前市场热点主题的聚合信息，包含主题名称、
 *       相关基金数量、主题近期涨跌幅及关联重点基金，
 *       常用于首页热点主题推荐模块。
 *
 * @param {object} params - 无需传入参数（返回全量）
 *
 * @returns {object} 原始接口响应
 * @returns {Array}  data              - 焦点主题列表
 * @returns {string} data[].name       - 主题名称
 * @returns {string} data[].increase   - 近期涨跌幅(%)
 * @returns {Array}  data[].funds      - 该主题下代表基金列表
 *
 * @example GET /fundThemeFocusList
 */
const { request } = require('../utils/index.js');

/**
 * 获取主题焦点列表
 */
module.exports = async (params = {}) => {
  const url =
    'https://h5.1234567.com.cn/AggregationStaticService/chooseCustomRouter/getFundThemeFocusAggr';
  return request(url, params);
};
