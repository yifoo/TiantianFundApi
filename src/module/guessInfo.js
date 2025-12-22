/*
 * @Author: wuhao 
 * @Date: 2025-12-20 00:48:57 
 * @Desc: 判断是否是交易日
 * @Last Modified by: wuhao
 * @Last Modified time: 2025-12-20 00:49:57
 */

const { xjPost } = require('../utils/index.js');
module.exports = async (params = {}) => {
  const url = `https://uni-fundts.1234567.com.cn/forecast/ssec/guessinfo`
  let resp = await xjPost(url);
  return resp
};
