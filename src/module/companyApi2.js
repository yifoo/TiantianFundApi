/**
 * @api GET /companyApi2
 * @desc 获取基金公司详细信息
 * @desc 查询指定基金公司的基本信息，包含公司简介、成立日期、注册资本、
 *       官网地址、旗下基金数量及总管理规模等。
 *
 * @param {string} COMPANYCODE - [必填] 基金公司代码，可从 FundAllCompany 或 getFundCorpList 接口获取
 *
 * @returns {object} 原始接口响应
 * @returns {object} Datas              - 公司详细信息
 * @returns {string} Datas.SNAME        - 公司简称
 * @returns {string} Datas.FNAME        - 公司全称
 * @returns {string} Datas.ESTABDATE    - 成立日期
 * @returns {string} Datas.REGMONEY     - 注册资本
 * @returns {string} Datas.WEBSITE      - 官方网站
 * @returns {number} Datas.FUNDCOUNT    - 旗下基金数量
 * @returns {string} Datas.TOTALNETASSET - 总管理规模（元）
 *
 * @example GET /companyApi2?COMPANYCODE=80000229
 */
const { request } = require('../utils/index.js');

/**
 * 获取基金公司基础信息
 */
module.exports = async (params) => {
  const url = 'https://fundztapi.eastmoney.com/FundCompanyApi/CompanyApi2.ashx';
  return request(url, params);
};
