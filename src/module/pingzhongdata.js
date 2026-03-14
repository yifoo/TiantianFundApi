/**
 * @api GET /pingzhongdata
 * @desc 获取基金全量数据（东方财富 PC 版聚合接口）
 * @desc 从东方财富 pingzhongdata 接口获取基金的完整历史数据，包含：
 *       单位净值走势、累计净值走势、各阶段收益率、同类百分比排名走势、
 *       同类型基金各阶段涨幅榜、基金基本信息和现任基金经理列表。
 *       数据量较大（通常包含基金成立以来全量历史），适合图表绘制和长周期分析。
 *       注意：原始响应为 JS 文件（非 JSON），模块内部完成解析，对外统一返回结构化 JSON。
 *
 * @param {string} fcode - [必填] 基金代码，例：021528
 * @param {string} [fields] - 按需返回字段，逗号分隔，不传返回全部
 *                            可选：netWorthTrend / ACWorthTrend / currentFundManager /
 *                                  syl / rateInSimilarPersent / swithSameType
 *
 * @returns {object}
 * @returns {number}   code                                 - 200 成功 / 400 失败
 * @returns {string}   msg                                  - 结果描述
 * @returns {object}   data                                 - 解析后的基金数据
 * @returns {string}   data.fS_code                         - 基金代码
 * @returns {string}   data.fS_name                         - 基金名称
 * @returns {Array}    data.netWorthTrend                    - 单位净值走势（成立以来）
 * @returns {string}   data.netWorthTrend[].date             - 日期（YYYY-MM-DD）
 * @returns {number}   data.netWorthTrend[].y                - 单位净值
 * @returns {number}   data.netWorthTrend[].equityReturn      - 日涨跌幅(%)
 * @returns {string}   data.netWorthTrend[].unitMoney         - 每份派息金额（分红日才有值）
 * @returns {Array}    data.ACWorthTrend                     - 累计净值走势
 * @returns {string}   data.ACWorthTrend[].date              - 日期（YYYY-MM-DD）
 * @returns {number}   data.ACWorthTrend[].y                 - 累计净值
 * @returns {Array}    data.currentFundManager               - 现任基金经理列表
 * @returns {string}   data.currentFundManager[].id          - 经理 ID
 * @returns {string}   data.currentFundManager[].name        - 经理姓名
 * @returns {string}   data.currentFundManager[].startDate   - 任职起始日期
 * @returns {string}   data.currentFundManager[].photo       - 头像 URL
 * @returns {string}   data.currentFundManager[].resume      - 简介
 * @returns {object}   data.syl                             - 各阶段收益率
 * @returns {number}   data.syl.syl_1y                       - 近1月收益率(%)
 * @returns {number}   data.syl.syl_3y                       - 近3月收益率(%)
 * @returns {number}   data.syl.syl_6y                       - 近6月收益率(%)
 * @returns {number}   data.syl.syl_1n                       - 近1年收益率(%)
 * @returns {Array}    data.rateInSimilarPersent             - 同类百分比排名走势
 * @returns {string}   data.rateInSimilarPersent[].date      - 日期
 * @returns {number}   data.rateInSimilarPersent[].y         - 百分比排名（越低越好，0-100）
 * @returns {Array}    data.swithSameType                   - 同类型基金各阶段涨幅 Top5（5个时间阶段）
 * @returns {string}   data.swithSameType[].title           - 时间阶段描述（近1周/近1月/近3月/近6月/近1年）
 * @returns {Array}    data.swithSameType[].list            - 该阶段涨幅前5名基金列表
 * @returns {string}   data.swithSameType[].list[].code     - 基金代码
 * @returns {string}   data.swithSameType[].list[].name     - 基金名称
 * @returns {string}   data.swithSameType[].list[].zzf      - 该阶段涨跌幅(%)
 *
 * @example GET /pingzhongdata?fcode=021528
 * @example GET /pingzhongdata?fcode=021528&fields=swithSameType,syl
 * @example GET /pingzhongdata?fcode=021528&fields=netWorthTrend,swithSameType
 */
const { get } = require('../utils/index.js');

// 时间戳（毫秒）转 YYYY-MM-DD
const tsToDate = (ts) => {
  const d = new Date(ts);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
};

// 用正则从 JS 文本中提取变量值，支持数组/对象/字符串/数字/布尔
const extractVar = (text, varName) => {
  const pattern = new RegExp(
    `var\\s+${varName}\\s*=\\s*([\\s\\S]*?);\\s*(?:/\\*|var\\s|$)`,
    'm'
  );
  const match = text.match(pattern);
  if (!match) return null;
  try {
    // eslint-disable-next-line no-new-func
    return Function(`"use strict"; return (${match[1].trim()})`)();
  } catch {
    return match[1].trim().replace(/^["']|["']$/g, '');
  }
};

// 阶段标识 → 中文描述（兜底映射，接口本身也会返回 title 字段）
const TYPE_LABEL = {
  Z: '近1周',
  Y: '近1月',
  '3Y': '近3月',
  '6Y': '近6月',
  JN: '今年以来',
  '1N': '近1年',
  '2N': '近2年',
  '3N': '近3年',
  LN: '成立以来',
};

module.exports = async (params = {}) => {
  const { fcode, fields } = params;

  if (!fcode) {
    return { code: 400, msg: '缺少必填参数 fcode', data: null };
  }

  const url = `http://fund.eastmoney.com/pingzhongdata/${fcode}.js`;

  try {
    const resp = await get(url, { v: Date.now() }, {
      Host: 'fund.eastmoney.com',
      Referer: `http://fund.eastmoney.com/${fcode}.html`,
      Accept: '*/*',
    });

    if (resp.code !== 200 || !resp.data) {
      return { code: 400, msg: '上游接口请求失败', data: null };
    }

    const text = typeof resp.data === 'string' ? resp.data : String(resp.data);

    if (!text.includes('fS_name') || !text.includes('Data_netWorthTrend')) {
      return { code: 400, msg: `基金代码 ${fcode} 不存在或暂无数据`, data: null };
    }

    // ── 基础信息 ──────────────────────────────────────────────
    const fS_code = extractVar(text, 'fS_code') || fcode;
    const fS_name = extractVar(text, 'fS_name') || '';

    // ── 各阶段收益率 ──────────────────────────────────────────
    const syl = {
      syl_1y: extractVar(text, 'syl_1y'),   // 近1月
      syl_3y: extractVar(text, 'syl_3y'),   // 近3月
      syl_6y: extractVar(text, 'syl_6y'),   // 近6月
      syl_1n: extractVar(text, 'syl_1n'),   // 近1年
    };

    // ── 单位净值走势 ──────────────────────────────────────────
    // 原始格式：[{x: timestamp(ms), y: nav, equityReturn: %, unitMoney: ''}]
    let netWorthTrend = [];
    const rawNet = extractVar(text, 'Data_netWorthTrend');
    if (Array.isArray(rawNet)) {
      netWorthTrend = rawNet.map((item) => ({
        date: tsToDate(item.x),
        y: item.y,
        equityReturn: item.equityReturn,
        unitMoney: item.unitMoney || '',
      }));
    }

    // ── 累计净值走势 ──────────────────────────────────────────
    // 原始格式：[[timestamp(ms), accNav], ...]
    let ACWorthTrend = [];
    const rawAC = extractVar(text, 'Data_ACWorthTrend');
    if (Array.isArray(rawAC)) {
      ACWorthTrend = rawAC.map((item) => ({
        date: tsToDate(item[0]),
        y: item[1],
      }));
    }

    // ── 同类百分比排名走势 ────────────────────────────────────
    // 原始格式：[[timestamp(ms), percentRank], ...]  越低越好
    let rateInSimilarPersent = [];
    const rawRate = extractVar(text, 'Data_rateInSimilarPersent');
    if (Array.isArray(rawRate)) {
      rateInSimilarPersent = rawRate.map((item) => ({
        date: tsToDate(item[0]),
        y: item[1],
      }));
    }

    // ── 同类型基金各阶段涨幅榜 ───────────────────────────────
    // 原始格式：二维数组，共 5 个子数组，分别对应 近1周/近1月/近3月/近6月/近1年
    // 每个子数组包含最多 5 条字符串，格式：'基金代码_基金名称_阶段涨幅'
    // 注意：变量名本身就是 swithSameType（无 Data_ 前缀）
    // 示例：'001438_易方达瑞享混合E_149.29'
    const SWITH_PERIODS = ['近1年', '近2年', '近3年', '近5年', '今年来'];

    let swithSameType = [];
    const rawSimilar = extractVar(text, 'swithSameType');
    if (Array.isArray(rawSimilar)) {
      swithSameType = rawSimilar.map((periodArr, idx) => {
        const list = Array.isArray(periodArr)
          ? periodArr.map((entry) => {
            // 取第一个 _ 前为 code，最后一个 _ 后为 zzf，中间为 name
            const firstUnderscore = entry.indexOf('_');
            const lastUnderscore = entry.lastIndexOf('_');
            return {
              code: entry.slice(0, firstUnderscore),
              name: entry.slice(firstUnderscore + 1, lastUnderscore),
              zzf: entry.slice(lastUnderscore + 1),
            };
          })
          : [];
        return {
          title: SWITH_PERIODS[idx] || `阶段${idx + 1}`,
          list,
        };
      });
    }

    // ── 现任基金经理 ──────────────────────────────────────────
    let currentFundManager = [];
    const rawMgr = extractVar(text, 'Data_currentFundManager');
    if (Array.isArray(rawMgr)) {
      currentFundManager = rawMgr.map((m) => ({
        id: m.id,
        name: m.name,
        startDate: m.startDate || '',
        photo: m.photo || '',
        resume: m.resume || '',
        fundSize: m.fundSize || '',
      }));
    }

    // ── 按 fields 过滤 ────────────────────────────────────────
    const all = {
      fS_code,
      fS_name,
      syl,
      netWorthTrend,
      ACWorthTrend,
      rateInSimilarPersent,
      swithSameType,
      currentFundManager,
    };

    let data = all;
    if (fields) {
      const wanted = new Set(fields.split(',').map((f) => f.trim()));
      data = { fS_code, fS_name };
      for (const key of wanted) {
        if (key in all) data[key] = all[key];
      }
    }

    return { code: 200, msg: '获取成功', data };
  } catch (e) {
    return { code: 400, msg: `解析失败: ${e.message}`, data: null };
  }
};