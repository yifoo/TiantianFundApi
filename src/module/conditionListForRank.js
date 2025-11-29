/*
 * @Author: wuhao 
 * @Date: 2025-11-26 22:28:41 
 * @Desc: 获取基金类型
 * @Last Modified by: wuhao
 * @Last Modified time: 2025-11-29 10:21:57
 */
const { post } = require('../utils/index.js');
const dayjs = require('dayjs')

module.exports = async (params = {}, ctx) => {

  params = {
    plat: "Iphone",
    product: "EFund",
    rankSy: 1,
    showHK: 1,
    version: "6.8.2",
    deviceid: "94084AB3-7573-5EA7-BA65-C0DFRD33643B"
  }
  const url = 'https://condition.tiantianfunds.com/condition/conditionFund/conditionListForRank';
  const header = {
    Host: 'condition.tiantianfunds.com',
    'clientInfo': 'ttjj-iPad Pro 3 (12.9-inch)-iOS-iPadOS17.7',
    'Referer': 'https://mpservice.com/fund94570b183d8ea9/release/pages/Rank/index',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36',
    "sec-ch-ua": '"Chromium";v="142", "Google Chrome";v="142", "Not_A Brand";v="99"',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "macOS",
  }
  try {
    let res = await post(url, params, header);
    return {
      code: 200,
      data: res.Data,
      msg: '获取成功'
    }
  } catch (error) {
    console.log('error: ', error);
    return {
      code: 400,
      msg: '获取失败',
      data: error
    }
  }

};
