/**
 * @api GET /FundsMoreDetail
 * @desc 获取基金完整详情（聚合接口）
 * @desc 一次性返回基金的全维度信息，包含：基本信息、业绩指标（夏普比率、
 *       最大回撤、标准差）、费率结构、基准跟踪误差、关联主题及相似基金，
 *       适合基金详情页的完整渲染。
 *
 * @param {string} FCODE - [必填] 基金代码，例：003834
 *
 * @returns {object} 原始接口聚合响应（字段极多，以下列出主要部分）
 * @returns {string} SHORTNAME   - 基金简称
 * @returns {string} FTYPE       - 基金类型
 * @returns {string} JJGS        - 基金公司
 * @returns {string} ESTABDATE   - 成立日期
 * @returns {string} ENDNAV      - 最新规模（元）
 * @returns {string} DWJZ        - 单位净值
 * @returns {string} RZDF        - 日涨跌幅(%)
 * @returns {string} SYL_1N      - 近1年收益率(%)
 * @returns {string} RISKLEVEL   - 风险等级（1-5）
 * @returns {object} fundUniqueInfo - 风险指标（夏普、标准差、最大回撤等）
 * @returns {Array}  relateTheme    - 相关主题列表
 *
 * @example GET /FundsMoreDetail?FCODE=003834
 */
const { post } = require('../utils/index.js');

/**
 * 获取基金详情信息
 */
module.exports = async (params = {}) => {
  const url = `https://dgs.tiantianfunds.com/merge/m/api/jjxqy1_2`;
  params.indexfields = "_id,INDEXCODE,BKID,INDEXNAME,INDEXVALUA,NEWINDEXTEXCH,PEP100";
  params.fields = "BENCH,ESTDIFF,INDEXNAME,LINKZSB,INDEXCODE,NEWTEXCH,FTYPE,FCODE,BAGTYPE,RISKLEVEL,TTYPENAME,PTDT_FY,PTDT_TRY,PTDT_TWY,PTDT_Y,DWDT_FY,DWDT_TRY,DWDT_TWY,DWDT_Y,MBDT_FY,MBDT_TRY,MBDT_TWY,MBDT_Y,YDDT_FY,YDDT_TRY,YDDT_TWY,YDDT_Y,BFUNDTYPE,YMATCHCODEA,RLEVEL_SZ,RLEVEL_CX,ESTABDATE,JJGS,JJGSID,ENDNAV,FEGMRQ,SHORTNAME,TTYPE,TJDIN,FUNDEXCHG,LISTTEXCHMARK,FSRQ,ISSBDATE,ISSEDATE,FEATURE,DWJZ,LJJZ,MINRG,RZDF,PERIODNAME,SYL_1N,SYL_LN,SYL_Z,SOURCERATE,RATE,TSRQ,BTYPE,BUY,BENCHCODE,BENCH_CORR,TRKERROR,BENCHRATIO,NEWINDEXTEXCH,BESTDT_STRATEGY,BESTDT_Y,BESTDT_TWY,BESTDT_TRY,BESTDT_FY";
  params.fundUniqueInfo_fIELDS = "FCODE,STDDEV1,STDDEV_1NRANK,STDDEV_1NFSC,STDDEV3,STDDEV_3NRANK,STDDEV_3NFSC,STDDEV5,STDDEV_5NRANK,STDDEV_5NFSC,SHARP1,SHARP_1NRANK,SHARP_1NFSC,SHARP3,SHARP_3NRANK,SHARP_3NFSC,SHARP5,SHARP_5NRANK,SHARP_5NFSC,MAXRETRA1,MAXRETRA_1NRANK,MAXRETRA_1NFSC,MAXRETRA3,MAXRETRA_3NRANK,MAXRETRA_3NFSC,MAXRETRA5,MAXRETRA_5NRANK,MAXRETRA_5NFSC,TRKERROR1,TRKERROR_1NRANK,TRKERROR_1NFSC,TRKERROR3,TRKERROR_3NRANK,TRKERROR_3NFSC,TRKERROR5,TRKERROR_5NRANK,TRKERROR_5NFSC"
  params.fundUniqueInfo_fLFIELDS = "FCODE,BUSINESSTYPE,BUSINESSTEXT,BUSINESSCODE,BUSINESSSUBTYPE,MARK"
  params.cfhFundFInfo_fields = "INVESTMENTIDEAR,INVESTMENTIDEARIMG"
  params.relateThemeFields = "FCODE,SEC_CODE,SEC_NAME,CORR_1Y,OL2TOP"

  let resp = await post(url, params);
  return resp
};
