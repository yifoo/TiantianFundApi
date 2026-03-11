/**
 * @api GET /getFundCorpList
 * @desc 获取基金公司列表（格式化版，含管理规模和经理数）
 * @desc 与 fundCompanyBaseList 同源，但对返回字段做了格式化精简，
 *       每项只保留前端最常用的字段：label/value/缩写/规模/经理数/成立日期。
 *
 * @param {object} params - 无需传入参数
 *
 * @returns {object}
 * @returns {number} code                - 200 成功 / 500 失败
 * @returns {string} msg                 - 结果描述
 * @returns {Array}  data                - 基金公司列表
 * @returns {string} data[].label        - 公司简称
 * @returns {string} data[].value        - 公司代码（COMPANYCODE）
 * @returns {string} data[].ABBNAME      - 公司缩写名
 * @returns {number} data[].count        - 旗下基金数量
 * @returns {number} data[].JJRS         - 基金经理人数
 * @returns {string} data[].estabdate    - 成立日期
 *
 * @example GET /getFundCorpList
 */
const { request } = require('../utils/index.js');

module.exports = async (params = {}) => {
  const url = `https://fundmobapi.eastmoney.com/FundMApi/FundCompanyBaseList.ashx`;
  let resp = await request(url);
  try {
    let corpList = resp.Datas.map((item, index) => {
      return {
        label: item.SNAME,
        value: item.COMPANYCODE,
        ABBNAME: item.ABBNAME,
        count: item.FUNDCOUNT,
        JJRS: item.JJRS,
        estabdate: item.ESTABDATE
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
