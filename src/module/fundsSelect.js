/*
 * @Author: wuhao 
 * @Date: 2025-11-26 22:28:41 
 * @Desc: 根据条件筛选基金
 * @Last Modified by: wuhao
 * @Last Modified time: 2025-12-01 10:59:47
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
