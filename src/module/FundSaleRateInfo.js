const { request } = require('../utils/index.js');

/**
 * 获取大数据榜单
 */
module.exports = async (params = {}) => {
  const url = 'https://fundcomapi.tiantianfunds.com/mm/fundTrade/FundRateInfo';
  params.FCODE = params.fcode
  params.plat = 'Iphone'
  params.product = 'EFund'
  return request(url, params);
};
