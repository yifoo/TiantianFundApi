/*
 * @Author: wuhao 
 * @Date: 2025-11-26 07:32:47 
 * @Desc: 获取全部基金公司列表
 * @Last Modified by: wuhao
 * @Last Modified time: 2025-11-29 09:30:38
 */
const { request } = require('../utils/index.js');

module.exports = async (params = {}) => {
  const url = `https://fundcomapi.tiantianfunds.com/mm/FundCompany/FundAllCompany`;
  let resp = await request(url);
  try {
    let corpList = resp.data.map((item, index) => {
      return {
        label: item.SNAME,
        value: item.COMPANYCODE,
        ABBNAME: item.ABBNAME,
        FNAME: item.FNAME,
      }
    })
    return {
      code: 200,
      data: corpList,
      msg: '获取基金公司成功'
    }
  } catch (e) {
    return {
      code: 500,
      msg: '获取基金公司失败'
    }
  }
};
