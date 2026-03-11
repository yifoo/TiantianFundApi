/**
 * @api GET /getBkField
 * @desc 获取行业板块研报数据
 * @desc 返回指定行业板块（默认申万行业 016 级别）的相关研报列表，
 *       包含报告标题、机构、发布日期、评级等信息，
 *       可用于行业研究参考。
 *
 * @param {object} params - 无需传入参数（当前固定查询 bkCode=016）
 *
 * @returns {object}
 * @returns {number} code      - 200 成功 / 400 失败
 * @returns {object} data      - 原始研报接口响应
 *
 * @example GET /getBkField
 */
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
