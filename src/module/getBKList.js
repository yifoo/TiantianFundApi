/*
 * @Author: wuhao 
 * @Date: 2025-11-26 23:08:17 
 * @Desc: 获取行业主题列表
 * @Last Modified by: wuhao
 * @Last Modified time: 2025-11-29 10:05:53
 */

const { request } = require('../utils/index.js');

module.exports = async (params = {}) => {
  // params._ = new Date().getTime()
  const url = `https://fundcomapi.tiantianfunds.com/mm/FundTheme/FundAllTheme`;
  const header = {
    "Accept": "*/*",
    "Accept-Encoding": "gzip, deflate, br, zstd",
    "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
    "Connection": "keep-alive",
    "DNT": 1,
    Host: "fundcomapi.tiantianfunds.com",
    Referer: 'https://mpservice.com/fundbd0c063ef3a507/release/pages/home/index',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36',
    "sec-ch-ua": '"Chromium";v="142", "Google Chrome";v="142", "Not_A Brand";v="99"',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "macOS",
    clientInfo: "ttjj-iPad Pro 3 (12.9-inch)-iOS-iPadOS17.7"
  }
  try {
    let resp = await request(url, params, header);
    return {
      code: 200,
      data: resp.data.ALL
    }
  } catch (err) {
    return {
      code: 400,
      data: err
    }
  }
};
