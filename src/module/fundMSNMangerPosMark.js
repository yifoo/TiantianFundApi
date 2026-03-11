/**
 * @api GET /fundMSNMangerPosMark
 * @desc 获取基金经理投资风格标签
 * @desc 返回系统对该基金经理投资风格的标签化描述，
 *       如"成长风格"、"价值风格"、"均衡配置"等，用于经理画像展示。
 *
 * @param {string} MGRID - [必填] 基金经理 ID
 *
 * @returns {object} 原始接口响应
 * @returns {Array}  Datas            - 风格标签列表
 * @returns {string} Datas[].MARK     - 风格标签名称
 * @returns {string} Datas[].DESC     - 标签说明
 *
 * @example GET /fundMSNMangerPosMark?MGRID=30249411
 */
const { post } = require('../utils/index.js');

/**
 * 获取基金经理风格
 */
module.exports = async (params) => {
  const url =
    'https://fundztapi.eastmoney.com/FundSpecialApiNew/FundMSNMangerPosMark';
  return post(url, params);
};
