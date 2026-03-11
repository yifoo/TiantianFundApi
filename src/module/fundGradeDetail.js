/**
 * @api GET /fundGradeDetail
 * @desc 获取基金评级详情
 * @desc 返回指定基金在多家机构（晨星、上海证券、招商证券等）的评级结果，
 *       含各机构最新评级星级及评级日期。
 *
 * @param {string} FCODE - [必填] 基金代码，例：003834
 *
 * @returns {object} 原始接口响应
 * @returns {Array}  Datas               - 评级列表（每条对应一家机构）
 * @returns {string} Datas[].JGMC        - 评级机构名称
 * @returns {string} Datas[].DQJB        - 最新评级星级（1-5）
 * @returns {string} Datas[].JBRQ        - 评级日期
 *
 * @example GET /fundGradeDetail?FCODE=003834
 */
const { request } = require('../utils/index.js');

/**
 * 获取评级
 */
module.exports = async (params) => {
  const url = 'https://fundmobapi.eastmoney.com/FundMApi/FundGradeDetail.ashx';
  return request(url, params);
};
