/**
 * @api GET /fundMNMangerList
 * @desc 获取基金的现任基金经理列表
 * @desc 返回指定基金当前在任的所有基金经理信息，含任职起始日期、
 *       任职期间收益率、历史管理基金数量等。
 *
 * @param {string} FCODE - [必填] 基金代码，例：003834
 *
 * @returns {object} 原始接口响应
 * @returns {Array}  Datas               - 基金经理列表
 * @returns {string} Datas[].MGRID       - 基金经理 ID
 * @returns {string} Datas[].MGRNAME     - 基金经理姓名
 * @returns {string} Datas[].STARTDATE   - 任职该基金起始日期
 * @returns {string} Datas[].FUNDTOTALNETASSET - 在管总规模（元）
 * @returns {string} Datas[].PENAVGROWTH - 任职期间基金净值增长率(%)
 * @returns {number} Datas[].POWER       - 综合评分
 *
 * @example GET /fundMNMangerList?FCODE=003834
 */
const { request } = require('../utils/index.js');

/**
 * 获取基金的基金经理
 */
module.exports = async (params) => {
  const url = 'https://fundmobapi.eastmoney.com/FundMNewApi/FundMNMangerList';
  return request(url, params);
};
