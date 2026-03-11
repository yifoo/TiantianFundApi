/**
 * @api GET /fundMSNMangerPerRank
 * @desc 获取基金经理在同类中的业绩排名
 * @desc 返回该基金经理在管代表基金在同类基金中的历史排名走势，
 *       可用于判断经理相对竞争力是否稳定。
 *
 * @param {string} MGRID - [必填] 基金经理 ID
 *
 * @returns {object} 原始接口响应
 * @returns {Array}  Datas            - 历史排名列表
 * @returns {string} Datas[].FSRQ     - 日期
 * @returns {string} Datas[].RANK     - 排名（名次）
 * @returns {string} Datas[].ALLCOUNT - 同类基金总数
 *
 * @example GET /fundMSNMangerPerRank?MGRID=30249411
 */
const { post } = require('../utils/index.js');

/**
 * 获取基金经理业绩排行
 */
module.exports = async (params) => {
  const url =
    'https://fundztapi.eastmoney.com/FundSpecialApiNew/FundMSNMangerPerRank';
  return post(url, params);
};
