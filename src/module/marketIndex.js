// const { get } = require('../utils/index.js');

// /**
//  * 获取主题焦点列表
//  */
// module.exports = async (params = {}, ctx) => {
//   const url = 'https://push2.eastmoney.com/api/qt/ulist.np/get';
//   // params.secids = params.secids;
//   //* 需指数对应代码："1.000001,0.399001"
//   params.fields = 'f2,f3,f4,f6,f12,f13,f14,f104,f105,f106'
//   params.fltt = 2
//   // f6- 交易规模
//   // f104 涨的家数
//   // f105 跌的家数
//   // f104 平的家数
//   //f12 - 代码
//   // f13 - 市场类型
//   // f14 - 名称
//   // f2 - 最新价
//   // f4 - 涨跌幅
//   // f3 - 涨跌额
//   let header = {
//     'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
//     'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
//     'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
//     'Accept-Encoding': 'gzip, deflate, br',
//     'Connection': 'keep-alive',
//     'Cache-Control': 'no-cache',
//     'Host': 'push2.eastmoney.com',
//     'Referer': 'https://quote.eastmoney.com/center/qqzs.html',
//     'Sec-Fetch-Dest': 'document',
//     'Sec-Fetch-Mode': 'navigate',
//     'Sec-Fetch-Site': 'same-site'
//   }
//   try {
//     let res = await get(url, params, header);
//     return {
//       code: 200,
//       data: res || {}
//     }
//   } catch (e) {
//     console.log('e: ', e);

//   }
// };

const https = require('https');

function fetchFundData() {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'push2.eastmoney.com',
      port: 443,
      path: '/api/qt/ulist.np/get?secids=1.000001,0.399001,0.399006,100.HSI,1.000688,1.899050,1.000016,0.899050,118.AU9999,122.XAU,101.SI00Y,100.NDX,100.SPX,100.DJIA,100.N225,100.KS11,100.SENSEX,100.SET,100.VNINDEX,100.SX5E,100.FTSE,1.000905,100.UDI,100.TWII,1.000300,1.000012&fields=f2,f3,f4,f6,f12,f13,f14,f104,f105,f106&fltt=2',
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': '*/*',
        'Referer': 'https://fund.eastmoney.com/',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive'
      },
      timeout: 30000
    };

    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (error) {
          reject(new Error('解析响应数据失败: ' + error.message));
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.on('timeout', () => {
      req.destroy();
      reject(new Error('请求超时'));
    });

    req.end();
  });
}

module.exports = fetchFundData;