const { request } = require('../utils/index.js');

/**
 * 获取主题焦点列表
 */
module.exports = (params = {}, ctx) => {
  const url = 'https://push2.eastmoney.com/api/qt/ulist.np/get';
  params.secids = params.secids;
  //* 需指数对应代码："1.000001,0.399001"
  params.fields = 'f2,f3,f4,f12,f13,f14'
  params.fltt = 2
  //f12 - 代码
  // f13 - 市场类型
  // f14 - 名称
  // f2 - 最新价
  // f4 - 涨跌幅
  // f3 - 涨跌额
  return request(url, params);
};
