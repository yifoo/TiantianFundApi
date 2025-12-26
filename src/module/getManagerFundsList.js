/*
 * @Author: wuhao 
 * @Date: 2025-12-27 00:10:03 
 * @Desc: 获取基金经理曾经管理的基金列表
 * @Last Modified by: wuhao
 * @Last Modified time: 2025-12-27 01:45:08
 */

const { request } = require('../utils/index.js');

module.exports = async (params = {}) => {

  const url = parseInt(params.manageType) === 1 ? `https://fundcomapi.tiantianfunds.com/mm/FundManger/MangerInOfficeFund` : `https://fundcomapi.tiantianfunds.com/mm/FundManger/MangerLeaveOfficeFund`;
  const header = {
    "Accept": "*/*",
    "Accept-Encoding": "gzip, deflate, br, zstd",
    "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
    "Connection": "keep-alive",
    "DNT": 1,
    "Content-Type": 'application/json',
    Host: "fundcomapi.tiantianfunds.com",
    Referer: 'https://mpservice.com/fund4822eee0dfd54d/release/pages/product/productPage',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36',
    "sec-ch-ua": '"Chromium";v="142", "Google Chrome";v="142", "Not_A Brand";v="99"',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "macOS",
    clientInfo: "ttjj-iPad Pro 3 (12.9-inch)-iOS-iPadOS17.7"
  }
  params = {
    MGRID: params.MGRID,
    plat: 'Iphone',
    sort: params.sort ? params.sort.slice(0, -3) : 'desc',
    sortColumn: params.sortColumn,
    AppVersion: "6.8.3",
    DeviceId: 'DeviceId=94084AB3-7573-5EA7-BA65-C0D532D33643B',
    product: "EFund"
  }
  try {
    let resp = await request(url, params, header);
    return {
      code: 200,
      data: resp.data
    }
  } catch (err) {
    return {
      code: 400,
      data: err
    }
  }
};
