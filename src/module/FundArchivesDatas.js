const { request } = require('../utils/index.js');
const cheerio = require('cheerio');

/**
 * 获取基金持仓数据
 */
module.exports = async (params = {}) => {
  const url = 'https://fundf10.eastmoney.com/FundArchivesDatas.aspx';
  const resp = await request(url, params);
  const $ = cheerio.load(resp.split('"')[1])
  const data = [];
  $('table tbody tr').map(function() {
    const $cells = $(this).find('td');
    if(data.length>=parseInt(params.topline)||!$($cells[8]).text().trim()){
      return false;
    }
    data.push({
      rankNo: parseInt($($cells[0]).text().trim()),//占比排名
      code: $($cells[1]).text().trim(),//股票代码
      stockName: $($cells[2]).text().trim(),//股票名称
      ratio: $($cells[6]).text().trim().slice(0,-1), //占净值比例
      shares: parseFloat($($cells[7]).text().trim()).toFixed(2),//持股数（万股）
      money: parseFloat($($cells[8]).text().trim().replace(/,/g, ''))//持仓市值（万元）
    });
  })
  let codeList = $("#gpdmList").text()
  const resp2 = await request(`https://push2.eastmoney.com/api/qt/ulist.np/get?fltt=2&invt=2&fields=f2,f3,f12,f14`, {secids:codeList});
  const fundsPriceLimit = resp2.data.diff
  const result = new Map();
    fundsPriceLimit.forEach(item => {
      result.set(item.f12, item);
    });
  codeList = codeList.split(",")
  let stockTypeList=new Map();
  for (let i of codeList){
    if(i){
    let resp = await request(`https://push2.eastmoney.com/api/qt/slist/get?fltt=1&invt=2&fields=f9,f12,f13,f14&pn=1&np=1&spt=1`, {secid:i});
    stockTypeList.set(resp.data.diff[0].f12,{typeCode:resp.data.diff[1].f12,typeName:resp.data.diff[1].f14}) 
    }
  }
  let sumRadio=0
  // 遍历 arr 数组，根据 fcode 匹配并添加 price 和 rate
  data.forEach(item => {
    const matchedItem = result.get(item.fcode);
    const matchedTypeItem = stockTypeList.get(item.code);
    if (matchedItem) {
      item.price = matchedItem.f2;//最新价格
      item.rate = matchedItem.f3;// 涨跌幅
    }
    if (matchedTypeItem) {
      item.typeCode = matchedTypeItem.typeCode;
      item.typeName = matchedTypeItem.typeName;
    }
    sumRadio+=parseFloat(item.ratio||0)
  });
  
  return {
    code:200,
    data,
    sumRadio:sumRadio.toFixed(2)
  }
};
