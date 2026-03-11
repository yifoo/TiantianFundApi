/**
 * @api GET /FundVPageAccV2
 * @desc 获取基金净值走势与对比指数数据（V2版）
 * @desc 返回指定时间范围内基金的单位净值走势，同时支持叠加对比指数曲线，
 *       适用于净值走势图的图表渲染（支持与沪深300等基准指数对比）。
 *
 * @param {string} fcode     - [必填] 基金代码，例：003834
 * @param {string} [indexCode] - 对比指数代码，例：000300（沪深300）
 * @param {string} [range]   - 时间范围，可选值：1M / 3M / 6M / 1Y / 3Y / 5Y / MAX，留空返回全部
 *
 * @returns {object} 原始接口响应
 * @returns {Array}  data.LSJZList          - 历史净值列表
 * @returns {string} data.LSJZList[].FSRQ   - 净值日期
 * @returns {string} data.LSJZList[].DWJZ   - 单位净值
 * @returns {string} data.LSJZList[].LJJZ   - 累计净值
 * @returns {Array}  data.IndexList         - 对比指数走势（若传了 indexCode）
 *
 * @example GET /FundVPageAccV2?fcode=003834&range=1Y&indexCode=000300
 */
const { request } = require('../utils/index.js');

module.exports = async (params = {}) => {
  const url = 'https://fundcomapi.tiantianfunds.com/mm/newCore/FundVPageAccV2';

  return request(url, {
    FCODE: params.fcode,
    INDEXCODE: params.indexCode,
    RANGE: params.range || '',  // 修复：原为硬编码的 'RANGE' 字符串
    plat: 'Iphone',
    product: 'EFund',
  });
};
