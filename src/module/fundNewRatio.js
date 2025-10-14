const { request } = require('../utils/index.js');
const { jsonp } = require('../utils/index.js');

/**
 * 获取基金持仓数据
 */
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
