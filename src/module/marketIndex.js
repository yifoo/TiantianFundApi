const { get } = require('../utils/index.js');

/**
 * 获取主题焦点列表
 */
module.exports = async (params = {}, ctx) => {
  const url = 'https://push2.eastmoney.com/api/qt/ulist.np/get';
  //* 需指数对应代码："1.000001,0.399001"
  params.dpt = 'jj.hqpush'
  params.fltt = 2
  params.pn = 1;
  params.pz = 100

  let header = {

    "Accept": "*/*",
    "Accept-Encoding": "gzip, deflate, br, zstd",
    "Accept-Encoding": "gzip",
    "Content-Type": "application/x-www-form-urlencoded",
    "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
    "Connection": "keep-alive",
    "DNT": 1,
    tracestate: "pid = 0x14ae0b310, taskid=0x6000004c6580",
    Host: "push2.eastmoney.com",
    Referer: "https://quote.eastmoney.com/center/qqzs.html",
    // "Sec-Fetch-Dest": "script",
    // "Sec-Fetch-Mode": "cors",
    // "Sec-Fetch-Site": "same-site",
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36',
    "sec-ch-ua": '"Chromium";v="142", "Google Chrome";v="142", "Not_A Brand";v="99"',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "macOS",
  }
  try {
    params = new URLSearchParams(params);
    let resp = await fetch(`https://push2.eastmoney.com/api/qt/ulist.np/get?${params}`);
    console.log('resp: ', resp.ok);
    // let resp = await get(url, params, header);
    if (resp.ok) {
      let data = await resp.json()
      console.log('data: ', data.data);
      return { code: 200, msg: '获取指数成果', data: data.data };
    } else {
      return { code: 400, msg: '抓取失败', data: {} };
    }
  } catch (e) {
    console.log('e: ', e);
    return { code: 400, msg: '抓取失败', data: {} };

  }
};
