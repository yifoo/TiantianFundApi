/**
 * @api GET /fundsSelect
 * @desc 按条件筛选基金（多维度过滤 + 分页）
 * @desc 支持按基金类型、风险等级、申购状态、标签（如优选）等
 *       多维度条件过滤基金，并返回总数，适合高级筛选页面。
 *
 * @param {string} sort        - [必填] 排序配置 JSON 字符串
 *                               key 可选：gsZzl / daySyl / weekSyl / monthSyl /
 *                                         qsyl / hySyl / yearSyl / twySyl / trySyl /
 *                                         fySyl / sySyl / lnSyl
 *                               value：ascend（升序）/ descend（降序）
 *                               示例：{"yearSyl":"descend"}
 * @param {number} current     - [必填] 页码，从 1 开始
 * @param {number} pageSize    - [必填] 每页条数
 * @param {string} [rsbType]   - 基金类型代码，可从 conditionListForRank 接口获取
 * @param {string} [bkcodes]   - 行业代码过滤，可从 getBKList 接口获取
 * @param {string} [stageRanking] - 阶段排名过滤
 *
 * @returns {object}
 * @returns {number} code    - 200 成功 / 400 失败
 * @returns {string} msg     - 结果描述
 * @returns {Array}  data    - 符合条件的基金列表
 * @returns {number} total   - 符合条件的基金总数
 *
 * @example GET /fundsSelect?sort={"yearSyl":"descend"}&current=1&pageSize=20
 */
const { post } = require('../utils/index.js');
const dayjs = require('dayjs')

module.exports = async (params = {}, ctx) => {
  let sort = JSON.parse(params.sort)
  let sortKey = Object.keys(sort).length > 0 ? Object.keys(sort)[0] : ''
  let sortItem = Object.keys(sort).length > 0 ? (sort[sortKey] === 'ascend' ? '1' : '-1') : '';
  let sc = '5_1_';
  switch (sortKey) {
    case "gsZzl": sc = '20_'; break;
    case "daySyl": sc = '5_1_'; break;
    case "weekSyl": sc = '5_2_'; break;
    case "monthSyl": sc = '5_3_'; break;
    case "qsyl": sc = '5_4_'; break;
    case "hySyl": sc = '5_5_'; break;
    case "yearSyl": sc = '5_6_'; break;
    case "twySyl": sc = '5_7_'; break;
    case "trySyl": sc = '5_8_'; break;
    case "fySyl": sc = '5_9_'; break;//!5年
    case "sySyl": sc = '5_10_'; break;//!成立以来
    case "lnSyl": sc = '5_11_'; break;
    default: sc = "5_1_-1"; break;
  }
  params = {
    // abnormal: 3,
    // establishPeriod: 2,
    ...params,
    // bkcodes: params.bkcodes || '',
    // stageRanking: params.stageRanking || '',
    fields: "MAXSG,ISBUY",
    isSale: 1,
    orderField: sc + sortItem,
    pageIndex: params.current,
    pageNum: params.pageSize,
    pageType: 2,
    plat: "Iphone",
    product: "EFund",
    // rsbType: params.rsbType || '',//?基金类型
    rankSy: 1,
    showHK: 1,
    version: "6.8.2",
  }
  const url = 'https://condition.tiantianfunds.com/condition/conditionFund/fundSelect';
  const totalUrl = `https://condition.tiantianfunds.com/condition/conditionFund/fundCount`
  delete params.sort
  delete params.current
  delete params.pageSize
  try {
    let res = await post(url, params);
    let res2 = await post(totalUrl, params);
    return {
      code: 200,
      data: res.Data,
      total: res2.Data,
      msg: '获取成功'
    }
  } catch (error) {
    console.log('error: ', error);
    return {
      code: 400,
      msg: '获取失败',
      data: error
    }
  }

};
