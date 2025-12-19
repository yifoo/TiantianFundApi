/*
 * @Author: wuhao 
 * @Date: 2025-11-26 07:31:58 
 * @Desc: 批量获取实时基金净值及幅度
 * @Last Modified by: wuhao
 * @Last Modified time: 2025-12-20 00:33:09
 */
const { xjPost } = require('../utils/index.js');
module.exports = async (params = {}) => {
  const url = `https://api.xiaobeiyangji.com/yangji-api/api/get-gains`
  let resp = await xjPost(url, {
    codeArr: JSON.parse(params.codeList),
    date: params.date,
    "unionId": "o896o5zJdSAcXOdHps",
    "dataResources": "4",
    "dataSourceSwitch": true,
    "version": "3.4.1.X"
  });
  return resp
};
