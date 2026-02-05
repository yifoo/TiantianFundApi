const { get } = require('../utils/index.js');

/**
 * 获取主题焦点列表
 */
module.exports = async (params = {}, ctx) => {
  const url = 'https://push2.eastmoney.com/api/qt/ulist.np/get';
  // params.secids = params.secids;
  //* 需指数对应代码："1.000001,0.399001"
  params.fields = 'f2,f3,f4,f6,f12,f13,f14,f104,f105,f106'
  params.dpt = 'sc.wxdcxcx'
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
  // params = {
  //   fields: ["f12%2Cf13%2Cf14%2Cf292%2Cf1%2Cf2%2Cf4%2Cf3%2Cf152"],
  //   secids: "1.000001%2C0.399001%2C0.399006%2C100.HSI%2C100.HSCEI%2C100.HSAHP%2C100.DJIA%2C100.SPX%2C100.NDX",
  //   dpt: "sc.wxdcxcx",
  //   fltt: ["1"],
  //   np: 1,
  //   invt: 2,
  //   fs: "i%3A100.SX5E%2Ci%3A100.FTSE%2Ci%3A100.MCX%2Ci%3A100.AXX%2Ci%3A100.FCHI%2Ci%3A100.GDAXI%2Ci%3A100.RTS%2Ci%3A100.IBEX%2Ci%3A100.PSI20%2Ci%3A100.OMXC20%2Ci%3A100.BFX%2Ci%3A100.AEX%2Ci%3A100.WIG%2Ci%3A100.OMXSPI%2Ci%3A100.SSMI%2Ci%3A100.HEX%2Ci%3A100.OSEBX%2Ci%3A100.ATX%2Ci%3A100.MIB%2Ci%3A100.ASE%2Ci%3A100.ICEXI%2Ci%3A100.PX%2Ci%3A100.ISEQ",
  //   pn: 1,
  //   pz: 100,
  //   po: 1,
  //   dect: 1,
  // }
  let header = {
    "Accept": "*/*",
    "Accept-Encoding": "gzip, deflate, br, zstd",
    "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
    "Connection": "keep-alive",
    "DNT": 1,
    Host: "push2.eastmoney.com",
    Referer: "https://quote.eastmoney.com/center/qqzs.html",
    "Sec-Fetch-Dest": "script",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-site",
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36',
    "sec-ch-ua": '"Chromium";v="142", "Google Chrome";v="142", "Not_A Brand";v="99"',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "macOS",
  }
  try {
    // console.log('params: ', params);
    let res = await get(url, params, header);
    return {
      code: 200,
      data: res.data.data || {}
    }
  } catch (e) {
    console.log('e: ', e);

  }
};
