const { request } = require('../utils/index.js');

/**
 * 获取基金历史净值
 */
module.exports = async (params = {}) => {
  const url = 'https://fundcomapi.tiantianfunds.com/mm/newCore/FundVPageAccV2';
  let _params = {}
  _params.FCODE = params.fcode
  _params.INDEXCODE = params.indexCode
  _params.RANGE = 'RANGE'
  _params.plat = 'Iphone'
  _params.product = 'EFund'
  return request(url, _params);
};
