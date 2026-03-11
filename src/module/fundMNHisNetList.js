/**
 * @api GET /fundMNHisNetList
 * @desc 获取基金历史净值列表
 * @desc 按分页返回基金历史每日净值记录，包含单位净值、累计净值、
 *       日涨跌幅及申购赎回状态，支持按日期范围筛选。
 *
 * @param {string} FCODE       - [必填] 基金代码，例：003834
 * @param {number} [pageIndex] - 页码，从 1 开始，默认 1
 * @param {number} [pageSize]  - 每页条数，最大 40，默认 20
 * @param {string} [SDATE]     - 开始日期，格式 YYYY-MM-DD
 * @param {string} [EDATE]     - 结束日期，格式 YYYY-MM-DD
 *
 * @returns {object} 原始接口响应
 * @returns {Array}  Datas              - 历史净值列表
 * @returns {string} Datas[].FSRQ       - 净值日期
 * @returns {string} Datas[].DWJZ       - 单位净值
 * @returns {string} Datas[].LJJZ       - 累计净值
 * @returns {string} Datas[].JZZZL      - 日涨跌幅(%)
 * @returns {string} Datas[].SGZT       - 申购状态
 * @returns {string} Datas[].SHZT       - 赎回状态
 * @returns {number} TotalCount         - 总记录数
 *
 * @example GET /fundMNHisNetList?FCODE=003834&pageIndex=1&pageSize=20
 * @example GET /fundMNHisNetList?FCODE=003834&SDATE=2024-01-01&EDATE=2024-03-01
 */
const { post } = require('../utils/index.js');

/**
 * 获取基金历史净值
 */
module.exports = async (params = {}) => {
  const url = 'https://fundmobapi.eastmoney.com/FundMNewApi/FundMNHisNetList';
  return post(url, params);
};
