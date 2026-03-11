/**
 * @api GET /fundMNPeriodIncrease
 * @desc 获取基金各阶段涨跌幅（收益率）
 * @desc 返回基金在标准时间维度下的历史收益率，包括近1周、近1月、近3月、
 *       近6月、近1年、近3年、今年以来、成立以来等，适合业绩概览展示。
 *
 * @param {string} FCODE - [必填] 基金代码，例：003834
 *
 * @returns {object} 原始接口响应
 * @returns {Array}  Datas               - 各阶段收益率列表
 * @returns {string} Datas[].title       - 时间阶段描述（如"近1年"）
 * @returns {string} Datas[].syl         - 基金涨跌幅(%)
 * @returns {string} Datas[].avg         - 同类平均涨跌幅(%)
 * @returns {string} Datas[].hs300       - 沪深300同期涨跌幅(%)
 *
 * @example GET /fundMNPeriodIncrease?FCODE=003834
 */
const { request } = require('../utils/index.js');

/**
 * 获取年度涨幅
 */
module.exports = async (params) => {
  const url =
    'https://fundmobapi.eastmoney.com/FundMNewApi/FundMNPeriodIncrease';
  return request(url, params);
};
