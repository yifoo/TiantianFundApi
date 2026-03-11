/**
 * @api GET /getManagerFundsList
 * @desc 获取基金经理的在管/曾管基金列表
 * @desc 根据 manageType 参数区分返回"当前在管"或"历史曾管"的基金列表，
 *       支持按多种维度排序，适用于基金经理详情页的基金列表展示。
 *
 * @param {string} MGRID          - [必填] 基金经理 ID
 * @param {number} manageType     - [必填] 1=当前在管基金  2=历史曾管基金
 * @param {string} [sortColumn]   - 排序字段，例：SYL_1N（近1年）/ ENDNAV（规模）
 * @param {string} [sort]         - 排序方向，descend（默认降序）/ ascend
 *
 * @returns {object}
 * @returns {number} code              - 200 成功 / 400 失败
 * @returns {Array}  data              - 基金列表
 * @returns {string} data[].FCODE      - 基金代码
 * @returns {string} data[].SHORTNAME  - 基金简称
 * @returns {string} data[].STARTDATE  - 任职起始日期
 * @returns {string} data[].ENDDATE    - 任职终止日期（在管则为空）
 * @returns {string} data[].DWJZ       - 最新单位净值
 * @returns {string} data[].SYL_1N     - 近1年收益率(%)
 *
 * @example GET /getManagerFundsList?MGRID=30249411&manageType=1&sortColumn=SYL_1N
 * @example GET /getManagerFundsList?MGRID=30249411&manageType=2
 */
const { request } = require('../utils/index.js');

module.exports = async (params = {}) => {

  const url = parseInt(params.manageType) === 1 ? `https://fundcomapi.tiantianfunds.com/mm/FundManger/MangerInOfficeFund` : `https://fundcomapi.tiantianfunds.com/mm/FundManger/MangerLeaveOfficeFund`;
  const header = {
    "Accept": "*/*",
    "Accept-Encoding": "gzip, deflate, br, zstd",
    "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
    "Connection": "keep-alive",
    "DNT": 1,
    "Content-Type": 'application/json',
    Host: "fundcomapi.tiantianfunds.com",
    Referer: 'https://mpservice.com/fund4822eee0dfd54d/release/pages/product/productPage',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36',
    "sec-ch-ua": '"Chromium";v="142", "Google Chrome";v="142", "Not_A Brand";v="99"',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "macOS",
    clientInfo: "ttjj-iPad Pro 3 (12.9-inch)-iOS-iPadOS17.7"
  }
  params = {
    MGRID: params.MGRID,
    plat: 'Iphone',
    sort: params.sort ? params.sort.slice(0, -3) : 'desc',
    sortColumn: params.sortColumn,
    AppVersion: "6.8.3",
    DeviceId: 'DeviceId=94084AB3-7573-5EA7-BA65-C0D532D33643B',
    product: "EFund"
  }
  try {
    let resp = await request(url, params, header);
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
