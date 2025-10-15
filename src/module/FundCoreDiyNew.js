const { post } = require('../utils/index.js');

/**
 * 获取基金持仓净值及幅度
 */
module.exports = async (params = {}) => {
  const url = `https://fundcomapi.tiantianfunds.com/mm/newCore/FundCoreDiyNew`;
  params.FIELDS="SHORTNAME,RZDF,DWJZ,LJJZ,FSRQ,ISBUY,FTYPE,FCODE"
  let resp = await post(url, params);
    return resp
};
