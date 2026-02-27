const { request, get } = require('../utils/index.js');

/**
 * 获取基金持仓数据
 */
module.exports = async (params = {}) => {
  const url = 'https://fundcomapi.tiantianfunds.com/mm/FundMNewApi/FundInverstPosition';
  let fundStocks = {}
  try {
    const resp = await request(url, { ...params, ...{ appType: 'ttjj', plat: 'Iphone', product: 'EFund', version: '6.8.2' } });

    fundStocks = resp.data.fundStocks
    let codeList = []
    codeList = fundStocks.map(item => {
      return `${item.NEWTEXCH}.${item.GPDM}`
    })
    const header = {
      Host: "push2.eastmoney.com",
      tracestate: "pid=0x14ae0b310,taskid=0x6000004c6580",
      Accept: " */*",
      GTOKEN: "BF0EE8509F444F118390658845558510",
      clientInfo: "ttjj-iPad Pro 3 (12.9-inch)-iOS-iPadOS17.7",
      "MP-VERSION": "1.3.6",
      "Accept-Language": "zh-Hans-CN;q=1",
      "Accept-Encoding": "gzip",
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent": "EMProjJijin/6.8.3 (iPad; iOS 17.7; Scale/2.00)",
      "Referer": "https://mpservice.com/7d7b3460cd40444ba58cdabdfae34442/release/pages/option/index",
      "Connection": "keep-alive",
      "traceparent": "00-751878b275c84f96a455daca1f172e39-0000000000000000-01"
    }
    const resp2 = await get(`https://push2.eastmoney.com/api/qt/ulist.np/get?fltt=2&invt=2&fields=f2,f3,f4,f5,f6,f7,f8,f9,f11,f12,f13,f14`, { secids: codeList.join(',') }, header);
    // //* f2:股价
    // //* f3:涨幅
    // //* f12:股票code
    // //* f14:股票名称
    const fundsPriceLimit = resp2.data.data.diff
    const result = new Map();
    fundsPriceLimit.forEach(item => {
      result.set(item.f12, item);
    });
    fundStocks.map((item) => {
      fundsPriceLimit.map(_item => {
        if (item.GPDM === _item.f12) {
          item.price = _item.f2
          item.ratio = _item.f3
        }
      })
    })

    return {
      code: 200,
      data: fundStocks,
    }
  } catch (e) {
    return {
      code: 200,
      data: fundStocks,
    }
    // return {
    //   code: 500,
    //   msg: "未查询到股票持仓信息!",
    // }
  }
};
