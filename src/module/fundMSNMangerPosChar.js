/**
 * @api GET /fundMSNMangerPosChar
 * @desc 获取基金经理持仓特征（持仓风格分析）
 * @desc 返回基金经理的持仓股票特征分析，包含行业集中度、市值偏好
 *      （大盘/中盘/小盘）、成长/价值风格偏好等。
 *
 * @param {string} MGRID - [必填] 基金经理 ID
 *
 * @returns {object} 原始接口响应
 * @returns {object} Datas               - 持仓特征数据
 * @returns {Array}  Datas.industry      - 行业分布
 * @returns {object} Datas.style         - 投资风格（成长/价值、大盘/小盘）
 *
 * @example GET /fundMSNMangerPosChar?MGRID=30249411
 */
const { post } = require('../utils/index.js');

/**
 * 获取基金经理持仓特点
 */
module.exports = async (params) => {
  const url =
    'https://fundztapi.eastmoney.com/FundSpecialApiNew/FundMSNMangerPosChar';
  return post(url, params);
};
