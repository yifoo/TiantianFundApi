const { xjPost } = require('../utils/index.js');
/**
 * 批量获取基金净值及幅度
 */
module.exports = async (params = {}) => {
  const url = `https://api.xiaobeiyangji.com/yangji-api/api/get-optional-change-nav`;
  let resp = await xjPost(url, {
    codeArr: typeof params.codeList === 'string' ? [params.codeList] : JSON.parse(params.codeList),
    valuationDate: params.date,
    navDate: params.date,
    isTD: true,
    version: "3.3.2.app"
  });
  return resp
};
