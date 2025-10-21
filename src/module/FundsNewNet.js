const { post } = require('../utils/index.js');

/**
 * 获取基金持仓净值及幅度
 */
module.exports = async (params = {}) => {
  const url = `https://fundcomapi.tiantianfunds.com/mm/FundFavor/FundFavorInfo`;
  params.FIELDS = "ISHUOQI,ISBUY,MAXSG,FCODE,SHORTNAME,PDATE,NAV,ACCNAV,NAVCHGRT,NAVCHGRT100,GSZ,GSZZL,GZTIME,NEWPRICE,CHANGERATIO,ZJL,HQDATE,ISREDBAGS,SYL_Z,SYL_Y,SYL_3Y,SYL_6Y,SYL_JN,SYL_1N,SYL_2N,SYL_3N,SYL_5N,SYL_LN,RSBTYPE,RSFUNDTYPE,SYRQ,INDEXCODE,NEWINDEXTEXCH,TRKERROR1"
  params.pageIndex = 1
  params.pageSize = 10000
  params.plat = 'Iphone'
  let resp = await post(url, params);
  return resp
};
