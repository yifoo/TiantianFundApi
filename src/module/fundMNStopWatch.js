/**
 * @api GET /fundMNStopWatch
 * @desc 获取基金简介与概要信息
 * @desc 返回基金最精简的概要卡片数据，包含基金名称、代码、类型、
 *       成立日期、基金公司、规模和最新净值，常用于列表项或搜索结果展示。
 *
 * @param {string} FCODE - [必填] 基金代码，例：003834
 *
 * @returns {object} 原始接口响应
 * @returns {object} Datas               - 基金概要信息
 * @returns {string} Datas.FCODE         - 基金代码
 * @returns {string} Datas.SHORTNAME     - 基金简称
 * @returns {string} Datas.FTYPE         - 基金类型
 * @returns {string} Datas.ESTABDATE     - 成立日期
 * @returns {string} Datas.JJGS         - 基金公司
 * @returns {string} Datas.ENDNAV        - 最新规模（元）
 * @returns {string} Datas.DWJZ          - 单位净值
 *
 * @example GET /fundMNStopWatch?FCODE=003834
 */
const { request } = require('../utils/index.js');

/**
 * 获取基金简介
 */
module.exports = async (params) => {
  const url = 'https://fundmobapi.eastmoney.com/FundMNewApi/FundMNStopWatch';
  return request(url, {
    ...params,
    deviceid: '123',
    plat: 'Iphone',
    version: '6.3.5',
    appVersion: '6.3.5',
  });
};
