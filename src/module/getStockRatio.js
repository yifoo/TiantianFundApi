const { request, get } = require('../utils/index.js');

/**
 * 获取基金持仓数据
 */
module.exports = async (params = {}) => {
  const url = 'https://fundcomapi.tiantianfunds.com/mm/FundMNewApi/FundInverstPosition';

  try {
    const resp = await request(url, { ...params, ...{ appType: 'ttjj', plat: 'Iphone', product: 'EFund', version: '6.8.2' } });

    let fundStocks = resp.data.fundStocks
    let codeList = []
    codeList = fundStocks.map(item => {
      return `${item.NEWTEXCH}.${item.GPDM}`
    })
    const resp2 = await get(`https://push2.eastmoney.com/api/qt/ulist.np/get?fltt=2&invt=2&fields=f2,f3,f4,f5,f6,f7,f8,f9,f11,f12,f13,f14`, { secids: codeList.join(',') });
    // //* f2:股价
    // //* f3:涨幅
    // //* f12:股票code
    // //* f14:股票名称
    const fundsPriceLimit = resp2.data.diff
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
      code: 500,
      data: "未查询到股票持仓信息!",
    }
  }
};
