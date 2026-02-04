/*
 * @Author: wuhao 
 * @Date: 2026-02-04 23:33:04 
 * @Desc: 获取基金净值估算（实时）
 * @Last Modified by:   wuhao 
 * @Last Modified time: 2026-02-04 23:33:04 
 */
const { request } = require('../utils/index.js');


module.exports = async (params = {}) => {
  const url =
    'https://fundcomapi.tiantianfunds.com/mm/fundTrade/FundValuationDetail';
  const res = await request(url, params);
  return res.data ? JSON.parse(res.data) : res.data
};
