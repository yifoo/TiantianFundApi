/*
 * @Author: wuhao 
 * @Date: 2025-11-26 07:32:47 
 * @Desc: 获取基金指数列表
 * @Last Modified by: wuhao
 * @Last Modified time: 2025-11-28 22:03:38
 */
const { request } = require('../utils/index.js');

module.exports = async (params = {}) => {
  const url = `https://fundcomapi.tiantianfunds.com/mm/FundSubject/FundBaseInfos`;
  try {
    let resp = await request(url, { FIELDS: 'INDEXCODE,INDEXNAME,INDEXQP' });
    console.log('resp: ', resp);
    return {
      code: 200,
      data: resp.data,
      msg: '获取基金指数成功'
    }
  } catch (e) {
    return {
      code: 500,
      msg: '获取基金指数失败'
    }
  }
};
