const { request, get } = require('../utils/index.js');

/**
 * 获取基金持仓数据
 */
module.exports = async (params = {}) => {
  const url = 'https://fundcomapi.tiantianfunds.com/mm/FundMNewApi/FundIVInfoMultiple';
  let header = {
    "Accept": "*/*",
    "Accept-Encoding": "gzip, deflate, br, zstd",
    "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
    "Connection": "keep-alive",
    "DNT": 1,
    Host: "fundcomapi.tiantianfunds.com",
    Referer: "https://mpservice.com/b34ccfc4ed9a4af4a4880fee485cf417/release/pages/fundHold/index",
    "MP-VERSION": "2.8.5",
    'User-Agent': 'EMProjJijin/6.8.2 (iPad; iOS 17.7; Scale/2.00)',
    "clientInfo": "ttjj-iPad Pro 3 (12.9-inch)-iOS-iPadOS17.7",
    "validmark": "WYzMTHcuTEShgscEPU1CN1wKYZ4t8SZ4b7zfEdBaH9bYX33O53u2rV8TINndCYqMw9sPQTmRPugEv + n09uWf6UQyqbSP9w0dWUIPVUDQDWy57Cfw++NN7Kaf/ QopbWaErC4cF35v6LBqMFBoOhRTpw =="
  }
  try {
    const resp = await get(url, { ...params, plat: 'Iphone', product: 'EFund', version: '6.8.2' }, header);
    return {
      code: 200,
      data: resp.data
    }
  } catch (e) {
    return {
      code: 200,
      data: e,
      msg: e.error
    }
  }

};
