/**
 * @api GET /fundMSNMangerPerEval
 * @desc 获取基金经理业绩评价（雷达图数据）
 * @desc 返回对基金经理多维度能力的量化评分，包含选股能力、择时能力、
 *       风险控制能力、稳定性、收益能力等维度，适合雷达图展示。
 *
 * @param {string} MGRID - [必填] 基金经理 ID
 *
 * @returns {object} 原始接口响应
 * @returns {object} Datas                 - 多维度评分
 * @returns {number} Datas.stockSelection  - 选股能力得分
 * @returns {number} Datas.timingAbility   - 择时能力得分
 * @returns {number} Datas.riskControl     - 风险控制得分
 * @returns {number} Datas.stability       - 稳定性得分
 * @returns {number} Datas.profitAbility   - 收益能力得分
 *
 * @example GET /fundMSNMangerPerEval?MGRID=30249411
 */
const { post } = require('../utils/index.js');

/**
 * 获取基金经理业绩评价
 */
module.exports = async (params) => {
  const url =
    'https://fundztapi.eastmoney.com/FundSpecialApiNew/FundMSNMangerPerEval';
  return post(url, params);
};
