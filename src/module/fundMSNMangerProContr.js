/**
 * @api GET /fundMSNMangerProContr
 * @desc 获取基金经理历史管理基金记录
 * @desc 返回基金经理曾经管理过的所有基金列表（含已离任），
 *       包含任职起止日期和任职期间收益率，用于评估其历史业绩。
 *
 * @param {string} MGRID - [必填] 基金经理 ID
 *
 * @returns {object} 原始接口响应
 * @returns {Array}  Datas                 - 历史管理基金列表
 * @returns {string} Datas[].FCODE         - 基金代码
 * @returns {string} Datas[].SHORTNAME     - 基金简称
 * @returns {string} Datas[].STARTDATE     - 任职起始日期
 * @returns {string} Datas[].ENDDATE       - 任职终止日期（在任则为空）
 * @returns {string} Datas[].PENAVGROWTH   - 任职期间净值增长率(%)
 *
 * @example GET /fundMSNMangerProContr?MGRID=30249411
 */
const { post } = require('../utils/index.js');

/**
 * 获取基金经理历史管理基金
 */
module.exports = async (params) => {
  const url =
    'https://fundztapi.eastmoney.com/FundSpecialApiNew/FundMSNMangerProContr';
  return post(url, params);
};
