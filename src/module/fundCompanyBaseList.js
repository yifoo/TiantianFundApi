/**
 * @api GET /fundCompanyBaseList
 * @desc 获取基金公司基础列表（精简版）
 * @desc 返回所有基金公司的基础信息，字段比 getFundCorpList 更丰富，
 *       含公司代码、简称、成立日期、旗下基金数量和基金经理人数。
 *
 * @param {object} params - 无需传入参数
 *
 * @returns {object} 原始接口响应
 * @returns {Array}  Datas               - 公司列表
 * @returns {string} Datas[].COMPANYCODE - 公司代码
 * @returns {string} Datas[].SNAME       - 公司简称
 * @returns {string} Datas[].ABBNAME     - 缩写名
 * @returns {string} Datas[].ESTABDATE   - 成立日期
 * @returns {number} Datas[].FUNDCOUNT   - 旗下基金数量
 * @returns {number} Datas[].JJRS        - 基金经理人数
 *
 * @example GET /fundCompanyBaseList
 */
const { request } = require('../utils/index.js');

/**
 * 获取基金公司列表（所有）
 */
module.exports = async () => {
  const url =
    'https://fundmobapi.eastmoney.com/FundMApi/FundCompanyBaseList.ashx';
  return request(url);
};
