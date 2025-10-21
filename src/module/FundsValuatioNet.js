const { post } = require('../utils/index.js');

/**
 * 批量获取基金净值及幅度
 */
module.exports = async (params = {}) => {
  const url = `https://api.xiaobeiyangji.com/yangji-api/api/get-optional-change-nav`;
  params.codeArr = params.codeList
  params.valuationDate = params.date
  params.navDate = params.date
  params.isTD = true
  params.version = "3.3.2.app"
  let resp = await post(url, params);
  return resp
};
