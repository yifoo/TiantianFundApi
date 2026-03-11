/**
 * @api GET /fundMNSubjectList
 * @desc 获取基金主题列表（全量）
 * @desc 返回天天基金平台上所有的基金主题分类，每个主题含主题名称、
 *       主题代码、主题下的基金数量等，可用于主题浏览导航。
 *
 * @param {object} params - 无需传入参数
 *
 * @returns {object} 原始接口响应
 * @returns {Array}  Datas              - 主题列表
 * @returns {string} Datas[].SUBJECTID  - 主题 ID
 * @returns {string} Datas[].SUBJECTNAME - 主题名称
 * @returns {number} Datas[].FUNDCOUNT  - 该主题下的基金数量
 *
 * @example GET /fundMNSubjectList
 */
const { request } = require('../utils/index.js');

/**
 * 获取基金主题列表（所有）
 */
module.exports = async () => {
  const url = 'https://fundmobapi.eastmoney.com/FundMNewApi/FundMNSubjectList';
  return request(url);
};
