const { get } = require('../utils/index.js');

/**
 * 获取主题焦点列表
 */
module.exports = async (params = {}, ctx) => {
  const url = 'https://push2.eastmoney.com/api/qt/ulist.np/get';
  // params.secids = params.secids;
  //* 需指数对应代码："1.000001,0.399001"
  params.dpt = 'jj.hqpush'
  params.fltt = 2
  params.pn = 1;
  params.pz = 100

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
    let resp = await get(url, params, header);
    if (resp.status === 200) {
      ctx.body = { code: 200, msg: '获取指数成果', data: resp.data.data };
    } else {
      ctx.body = { code: 400, msg: '抓取失败', data: {} };
    }
  } catch (e) {
    console.log('e: ', e);
    ctx.body = { code: 400, msg: '抓取失败', data: {} };

  }
};
