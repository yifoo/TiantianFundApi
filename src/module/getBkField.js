
const { get } = require('../utils/index.js');

module.exports = async (params = {}) => {
  params._ = new Date().getTime()
  params.bkCode = '016'
  const url = `https://reportapi.eastmoney.com/report/bk`;
  const header = {
    "Accept": "*/*",
    "Accept-Encoding": "gzip, deflate, br, zstd",
    "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
    "Connection": "keep-alive",
    "DNT": 1,
    Host: "reportapi.eastmoney.com",
    Referer: 'https://data.eastmoney.com/report/industry.jshtml?hyid=438',
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
    return {
      code: 200,
      data: resp.data
    }
  } catch (err) {
    return {
      code: 400,
      data: err
    }
  }
};
