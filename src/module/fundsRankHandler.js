/**
 * @api GET /fundsRankHandler
 * @desc 获取基金排行榜（东方财富 PC 版，支持多维度排序）
 * @desc 通过东方财富 PC 端排行接口获取基金排名，支持自定义排序维度
 *       和方向，返回经格式化处理的排行列表（各阶段收益率、净值、服务费等）。
 *
 * @param {string} [sort]      - 排序配置，JSON 字符串，key 为排序维度，value 为方向
 *                               示例：{"oneYear":"descend"} 按近1年降序
 *                               可选 key：dayRatio / oneWeek / oneMonth / threeMonth /
 *                                         sixMonth / oneYear / twoYear / threeYear /
 *                                         thisYear / created
 * @param {number} [current]   - 页码，默认 1
 * @param {number} [pageSize]  - 每页条数，默认 20
 * @param {string} [gs]        - 基金公司代码过滤（可选）
 *
 * @returns {object}
 * @returns {number} code              - 200 成功 / 400 失败
 * @returns {string} msg               - 结果描述
 * @returns {object} data              - 排行数据
 * @returns {Array}  data.datas        - 格式化后的基金排行列表
 * @returns {string} data.datas[].code        - 基金代码
 * @returns {string} data.datas[].shortName   - 基金简称
 * @returns {string} data.datas[].date        - 净值日期
 * @returns {string} data.datas[].unitNav     - 单位净值
 * @returns {string} data.datas[].dayRatio    - 日涨跌幅(%)
 * @returns {string} data.datas[].oneYear     - 近1年收益率(%)
 * @returns {string} data.datas[].created     - 成立以来收益率(%)
 * @returns {number} data.allRecords          - 总记录数
 *
 * @example GET /fundsRankHandler?sort={"oneYear":"descend"}&current=1&pageSize=20
 */
const { get } = require('../utils/index.js');
const dayjs = require('dayjs');

const SORT_KEY_MAP = {
  dayRatio: 'rzdf',
  oneWeek: 'zzf',
  oneMonth: '1yzf',
  threeMonth: '3yzf',
  sixMonth: '6yzf',
  oneYear: '1nzf',
  twoYear: '2nzf',
  threeYear: '3nzf',
  thisYear: 'jnzf',
  created: 'lnzf',
};

module.exports = async (params = {}) => {
  const url = 'https://fund.eastmoney.com/data/rankhandler.aspx';

  let sort = {};
  try { sort = JSON.parse(params.sort || '{}'); } catch { /* 非法参数，使用默认 */ }

  const sortKey = Object.keys(sort)[0] || '';
  const sortDir = sortKey ? sort[sortKey].replace(/(end|asc)$/, '').trim() : 'desc';
  const sc = SORT_KEY_MAP[sortKey] || 'rzdf';

  const queryParams = {
    op: 'ph', dt: 'kf', ft: 'all',
    gs: params.gs, sc, st: sortDir,
    sd: dayjs().subtract(1, 'year').format('YYYY-MM-DD'),
    ed: dayjs().format('YYYY-MM-DD'),
    pi: parseInt(params.current) || 1,
    pn: parseInt(params.pageSize) || 20,
    dx: 1,
  };

  const res = await get(url, queryParams, {
    Host: 'fund.eastmoney.com',
    Referer: 'https://fund.eastmoney.com/data/fundranking.html',
    'sec-fetch-dest': 'script',
    'sec-fetch-mode': 'no-cors',
    'sec-fetch-site': 'same-origin',
  });

  if (res.code !== 200) return { code: 400, msg: '获取失败', data: null };

  try {
    const raw = typeof res.data === 'string' ? res.data : String(res.data);
    // 原始响应格式: var rankData={datas:[...], allRecords:N, ...};
    // 用正则安全提取，不使用 eval
    const match = raw.match(/var\s+rankData\s*=\s*(\{[\s\S]*?\})\s*;/);
    if (!match) throw new Error('响应格式不符合预期');

    const jsonStr = match[1].replace(/,\s*([}\]])/g, '$1'); // 清理尾随逗号
    const rankData = JSON.parse(jsonStr);

    const list = (rankData.datas || []).map((item) => {
      const arr = item.split(',');
      return {
        code: arr[0], shortName: arr[1], date: arr[3],
        unitNav: arr[4], accNav: arr[5],
        dayRatio: arr[6], oneWeek: arr[7], oneMonth: arr[8],
        threeMonth: arr[9], sixMonth: arr[10], oneYear: arr[11],
        twoYear: arr[12], threeYear: arr[13], thisYear: arr[14],
        created: arr[15], createdDate: arr[16], serviceFee: arr[20],
      };
    });

    return { code: 200, msg: '获取成功', data: { ...rankData, datas: list } };
  } catch {
    return { code: 400, msg: '数据解析失败', data: null };
  }
};
