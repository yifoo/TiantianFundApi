/**
 * @api GET /fundMSNMangerInfo
 * @desc 获取基金经理详细信息
 * @desc 返回基金经理的个人资料，包含从业年限、学历背景、个人简介、
 *       历史管理基金数量、在管总规模及综合业绩评分等。
 *
 * @param {string} MGRID - [必填] 基金经理 ID，可从 fundMNMangerList 接口获取
 *
 * @returns {object} 原始接口响应
 * @returns {object} Datas                - 基金经理详细信息
 * @returns {string} Datas.MGRNAME        - 基金经理姓名
 * @returns {string} Datas.BIRTHDATE      - 出生年份
 * @returns {string} Datas.EDUCATION      - 学历
 * @returns {string} Datas.STARTDATE      - 从业起始日期
 * @returns {string} Datas.INTRO          - 个人简介
 * @returns {string} Datas.FUNDTOTALNETASSET - 在管总规模（元）
 * @returns {number} Datas.POWER          - 综合评分
 *
 * @example GET /fundMSNMangerInfo?MGRID=30249411
 */
const { post } = require('../utils/index.js');

/**
 * 获取基金经理信息
 */
module.exports = async (params) => {
  const url =
    'https://fundztapi.eastmoney.com/FundSpecialApiNew/FundMSNMangerInfo';
  return post(url, params);
};
