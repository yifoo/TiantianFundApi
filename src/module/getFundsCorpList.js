const { request } = require('../utils/index.js');

/**
 * 以基金名称搜索
 */
module.exports = async () => {
  const url = `https://fund.eastmoney.com/js/jjjz_gs.js?v=${new Date().getTime()}`;
  let resp = await request(url);
  try {
    eval(resp)
    let corpList = gs.op.map((item, index) => {
      return {
        label: item[1],
        value: item[0]
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
