const { request, get } = require('../utils/index.js');
const cheerio = require('cheerio');

/**
 * 获取基金持仓数据
 */
module.exports = async (params = {}) => {
  const url = 'https://fundcomapi.tiantianfunds.com/mm/FundMNewApi/FundInverstPosition';

  const resp = await request(url, { ...params, ...{ DATE: '2025-09-30', FCODE: '006229', appType: 'ttjj', plat: 'Iphone', product: 'EFund', version: '6.8.2' } });

  let fundStocks = resp.data.fundStocks
  console.log('fundStocks: ', fundStocks);
  let codeList = []
  codeList = fundStocks.map(item => {
    return `${item.NEWTEXCH}.${item.GPDM}`
  })
  console.log('codeList: ', codeList.join(','));
  const resp2 = await request(`https://push2.eastmoney.com/api/qt/ulist.np/get?appVersion=6.8.2&deviceid=94084AB3-7573-5EA7-BA65-C0DCED33643B&fields=f1%2Cf2%2Cf3%2Cf4%2Cf12%2Cf13%2Cf14%2Cf292&fltt=2&invt=2&plat=Iphone&product=EFund&secids=116.02268%2C116.06990%2C116.09926%2C116.02269%2C116.01530%2C1.603259%2C0.002821%2C1.688506%2C0.300759%2C0.002294&ut=94dd9fba6f4581ffc558a7b1a7c2b8a3&version=6.8.2`);
  //* f2:股价
  //* f3:涨幅
  //* f12:股票code
  //* f14:股票名称
  console.log('resp2.data: ', resp2.data);
  const fundsPriceLimit = resp2.data.diff
  // // console.log('fundsPriceLimit: ', fundsPriceLimit);
  // const result = new Map();
  // fundsPriceLimit.forEach(item => {
  //   result.set(item.f12, item);
  // });
  // // codeList = codeList.split(",")
  // let stockTypeList = new Map();
  // for (let i of codeList) {
  //   if (i) {
  //     let resp = await request(`https://push2.eastmoney.com/api/qt/slist/get?fltt=1&invt=2&fields=f9,f12,f13,f14&pn=1&np=1&spt=1`, { secid: i });
  //     stockTypeList.set(resp.data.diff[0].f12, { typeCode: resp.data.diff[1].f12, typeName: resp.data.diff[1].f14 })
  //   }
  // }
  // let sumRadio = 0
  // // 遍历 arr 数组，根据 fcode 匹配并添加 price 和 rate
  // data.forEach(item => {
  //   const matchedItem = result.get(item.code);
  //   const matchedTypeItem = stockTypeList.get(item.code);
  //   if (matchedItem) {
  //     item.price = matchedItem.f2;//最新价格
  //     item.rate = matchedItem.f3;// 
  //   }
  //   if (matchedTypeItem) {
  //     item.typeCode = matchedTypeItem.typeCode;
  //     item.typeName = matchedTypeItem.typeName;
  //   }
  //   sumRadio += parseFloat(item.ratio || 0)
  // });

  return {
    code: 200,
    data: resp2.data,
    // sumRadio: sumRadio.toFixed(2)
  }
};
