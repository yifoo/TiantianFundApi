const { get } = require('../utils/index.js');

/**
 * 获取主题焦点列表
 */
module.exports = async (params = {}, ctx) => {
  const url = 'https://push2.eastmoney.com/api/qt/ulist.np/get';
  // params.secids = params.secids;
  //* 需指数对应代码："1.000001,0.399001"
  params.fields = 'f2,f3,f4,f6,f12,f13,f14,f104,f105,f106'
  params.fltt = 2
  // f6- 交易规模
  // f104 涨的家数
  // f105 跌的家数
  // f104 平的家数
  //f12 - 代码
  // f13 - 市场类型
  // f14 - 名称
  // f2 - 最新价
  // f4 - 涨跌幅
  // f3 - 涨跌额
  let header = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
    'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
    'Accept-Encoding': 'gzip, deflate, br',
    'Connection': 'keep-alive',
    'Cache-Control': 'no-cache',
    'Host': 'push2.eastmoney.com',
    'Referer': 'https://quote.eastmoney.com/center/qqzs.html',
    'Sec-Fetch-Dest': 'document',
    'Sec-Fetch-Mode': 'navigate',
    'Sec-Fetch-Site': 'same-site'
  }
  try {
    let res = await get(url, params, header);
    return {
      code: 200,
      data: res || {}
    }
  } catch (e) {
    console.log('e: ', e);

  }
};
