/*
 * @Author: wuhao 
 * @Date: 2025-11-26 07:32:47 
 * @Desc: 获取天天基金基金模块
 * @Last Modified by: wuhao
 * @Last Modified time: 2025-12-07 10:25:28
 */
const { request } = require('../utils/index.js');

module.exports = async (params = {}) => {
  const url = `https://appactive.1234567.com.cn/AppoperationApi/Modules/GetModuleConfig`;
  const header = {
    "Accept": "*/*",
    "Accept-Encoding": "gzip, deflate, br, zstd",
    "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
    "Connection": "keep-alive",
    "DNT": 1,
    "Content-Type": 'application/x-www-form-urlencoded',
    Host: "appactive.1234567.com.cn",
    Referer: 'https://mpservice.com/fundbd0c063ef3a507/release/pages/select/index',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36',
    "sec-ch-ua": '"Chromium";v="142", "Google Chrome";v="142", "Not_A Brand";v="99"',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "macOS",
    clientInfo: "ttjj-iPad Pro 3 (12.9-inch)-iOS-iPadOS17.7"
  }
  params = {
    PlatId: 1,
    AppVersion: "6.8.2",
    PageType: "ConditionFund",
    DeviceId: 'DeviceId=94084AB3-7573-5EA7-BA65-C0D532D33643B',
    product: "EFund"
  }
  try {
    let resp = await request(url, params, header);
    return {
      code: 200,
      data: resp.datas.Modules
    }
  } catch (err) {
    return {
      code: 400,
      data: err
    }
  }
};
