/*
 * @Author: wuhao 
 * @Date: 2026-02-04 20:14:43 
 * @Desc: 批量获取基金净值及幅度
 * @Last Modified by: wuhao
 * @Last Modified time: 2026-02-04 23:34:59
 */
const { post } = require('../utils/index.js');

module.exports = async (params = {}) => {
  const url = `https://fundcomapi.tiantianfunds.com/mm/FundFavor/FundFavorInfo`;
  params.FIELDS = "ISBUY,MAXSG,FCODE,SHORTNAME,PDATE,NAV,ACCNAV,NAVCHGRT,NAVCHGRT100,GSZ,GSZZL,GZTIME,CHANGERATIO,ZJL,SYL_Z,SYL_Y,SYL_3Y,SYL_6Y,SYL_JN,SYL_1N,SYL_2N,SYL_3N,SYL_5N,SYL_LN,RSBTYPE,RSFUNDTYPE,SYRQ,INDEXCODE,NEWINDEXTEXCH"
  params.pageIndex = 1
  params.pageSize = 10000
  params.plat = 'Iphone'
  let resp = await post(url, params);
  return resp
};
