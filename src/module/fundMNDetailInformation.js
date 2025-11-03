const { request } = require('../utils/index.js');

/**
 * 获取基金详情
 */
module.exports = async (params) => {
  const url =
    'https://fundmobapi.eastmoney.com/FundMNewApi/FundMNDetailInformation';

  const url2 = 'https://fundcomapi.tiantianfunds.com/mm/fundTrade/FundRateInfo';
  params.FCODE = params.fcode
  params.plat = 'Iphone'
  let resp = await request(url, params)
  let resp2 = await request(url2, params)
  resp.Datas.sh = resp2.data.sh
  return resp
};
