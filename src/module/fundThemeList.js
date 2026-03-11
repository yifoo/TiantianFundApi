/**
 * @api GET /fundThemeList
 * @desc 获取热门主题列表
 * @desc 返回按热度排序的基金投资主题，包含主题代码、名称和
 *       主题内基金平均涨跌幅，适用于主题浏览和推荐场景。
 *
 * @param {object} params - 无需传入参数
 *
 * @returns {object} 原始接口响应
 * @returns {Array}  data              - 热门主题列表
 * @returns {string} data[].SUBJECTID  - 主题 ID
 * @returns {string} data[].SUBJECTNAME - 主题名称
 * @returns {string} data[].INCREASE   - 主题平均涨跌幅(%)
 *
 * @example GET /fundThemeList
 */
const { request } = require('../utils/index.js');

/**
 * 获取热门主题
 */
module.exports = async (params = {}) => {
  const url =
    'https://h5.1234567.com.cn/AggregationStaticService/getFundThemeListAggr';
  return request(url, params);
};
