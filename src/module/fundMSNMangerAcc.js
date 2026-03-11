/**
 * @api GET /fundMSNMangerAcc
 * @desc 获取基金经理业绩走势图数据
 * @desc 返回指定基金经理历史管理期间的累计收益走势，用于绘制
 *       经理维度的业绩曲线图，支持与市场基准对比。
 *
 * @param {string} MGRID  - [必填] 基金经理 ID，可从 fundMNMangerList 接口获取
 * @param {string} [FCODE] - 指定基金代码，不传则返回经理综合走势
 *
 * @returns {object} 原始接口响应
 * @returns {Array}  Datas            - 走势数据列表
 * @returns {string} Datas[].FSRQ     - 日期
 * @returns {string} Datas[].LJJZ     - 累计净值
 * @returns {string} Datas[].NSY      - 区间收益率(%)
 *
 * @example GET /fundMSNMangerAcc?MGRID=30249411
 */
const { post } = require('../utils/index.js');

/**
 * 获取基金经理业绩走势
 */
module.exports = async (params) => {
  const url =
    'https://fundztapi.eastmoney.com/FundSpecialApiNew/FundMSNMangerAcc';
  return post(url, params);
};
