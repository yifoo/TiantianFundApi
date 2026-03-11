/**
 * @api GET /fundRankDiagram
 * @desc 获取基金同类排名走势图数据
 * @desc 返回基金在各个历史时间点的同类排名百分位走势，
 *       用于绘制排名折线图，直观展示基金在同类中的相对位置变化。
 *
 * @param {string} FCODE - [必填] 基金代码，例：003834
 *
 * @returns {object} 原始接口响应
 * @returns {Array}  Datas              - 排名走势数据列表
 * @returns {string} Datas[].FSRQ       - 日期
 * @returns {string} Datas[].RANK       - 排名名次
 * @returns {string} Datas[].SL         - 同类基金总数
 * @returns {string} Datas[].PBL        - 排名百分位（越小越好）
 *
 * @example GET /fundRankDiagram?FCODE=003834
 */
const { request } = require('../utils/index.js');

/**
 * 获取同类排名
 */
module.exports = async (params) => {
  const url = 'https://fundmobapi.eastmoney.com/FundMApi/FundRankDiagram.ashx';
  return request(url, params);
};
