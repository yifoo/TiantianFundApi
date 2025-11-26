/*
 * @Author: wuhao 
 * @Date: 2025-11-26 07:31:58 
 * @Desc: 批量获取实时基金净值及幅度
 * @Last Modified by: wuhao
 * @Last Modified time: 2025-11-26 09:51:35
 */
const { xjPost } = require('../utils/index.js');
module.exports = async (params = {}) => {
  const url = `https://api.xiaobeiyangji.com/yangji-api/api/get-optional-change-nav`;
  let resp = await xjPost(url, {
    codeArr: params.codeList.includes('[') ? JSON.parse(params.codeList) : [params.codeList],
    valuationDate: params.date,
    navDate: params.date,
    isTD: true,
    version: "3.3.2.app"
  });
  return resp
};
