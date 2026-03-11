/**
 * @api GET /FundAllCompany
 * @desc 获取全部基金公司列表
 * @desc 返回天天基金平台收录的所有基金公司，含简称、全称、公司代码，
 *       可用于下拉选择器或公司维度的数据聚合。
 *
 * @param {object} params - 无必传参数
 *
 * @returns {object}
 * @returns {number}   code          - 200 成功 / 500 失败
 * @returns {string}   msg           - 结果描述
 * @returns {Array}    data          - 公司列表
 * @returns {string}   data[].label  - 公司简称（SNAME）
 * @returns {string}   data[].value  - 公司代码（COMPANYCODE）
 * @returns {string}   data[].ABBNAME - 公司缩写名
 * @returns {string}   data[].FNAME  - 公司全称
 *
 * @example GET /FundAllCompany
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
