const { request, get } = require('../utils/index.js');

/**
 * 获取基金持仓数据
 */
module.exports = async (params = {}) => {
  const url = 'https://fundcomapi.tiantianfunds.com/mm/FundMNewApi/FundInverstPosition';

  const resp = await request(url, { ...params, ...{ appType: 'ttjj', plat: 'Iphone', product: 'EFund', version: '6.8.2' } });

  let fundStocks = resp.data.fundStocks
  // console.log('fundStocks: ', fundStocks);
  return {
    code: 200,
    data: fundStocks,
  }
  // let codeList = []
  // codeList = fundStocks.map(item => {
  //   return `${item.NEWTEXCH}.${item.GPDM}`
  // })
  // console.log('codeList: ', codeList.join(','));
  // const resp2 = await request(`https://push2.eastmoney.com/api/qt/ulist.np/get?fltt=2&invt=2&fields=f2,f3,f4,f5,f6,f7,f8,f9,f11,f12,f13,f14`, { secids: codeList.join(',') });
  // //* f2:股价
  // //* f3:涨幅
  // //* f12:股票code
  // //* f14:股票名称
  // console.log('resp2.data: ', resp2.data);
  // const fundsPriceLimit = resp2.data.diff
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

  // return {
  //   code: 200,
  //   data: resp2.data,
  //   sumRadio: sumRadio.toFixed(2)
  // }
};
