/*
 * @Author: wuhao 
 * @Date: 2025-11-26 07:32:14 
 * @Desc: 获取昨日准确基金持仓数据
 * @Last Modified by: wuhao
 * @Last Modified time: 2025-11-26 07:32:43
 */
const { request } = require('../utils/index.js');

module.exports = async (params = {}) => {
  const url = `https://fundgz.1234567.com.cn/js/${params.fcode}.js?rt=${new Date().getTime()}`;
  let resp = await request(url, params);
  try {
    let res = JSON.parse(resp.slice("jsonpgz".length + 1, - 2))
    return {
      code: 200,
      data: res
    }
  } catch (e) {
    return {
      code: 400,
      error: e
    }
  }
};
