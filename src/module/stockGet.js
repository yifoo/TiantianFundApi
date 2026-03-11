/**
 * @api GET /stockGet
 * @desc 获取股票行情快照（全量字段）
 * @desc 返回指定股票的完整实时行情快照，包含最新价、涨跌幅、成交量、
 *       成交额、换手率、市盈率、市净率、52周最高/最低等全量字段。
 *
 * @param {string} type - [必填] 市场类型：1=上交所  0=深交所
 * @param {string} code - [必填] 股票代码（不含市场前缀），例：600519
 *
 * @returns {object} 原始接口响应（字段以 f 开头，常用字段如下）
 * @returns {object} data              - 行情快照
 *                   f43 = 最新价    f3 = 涨跌幅%    f4 = 涨跌额
 *                   f5  = 成交量    f6 = 成交额      f8 = 换手率%
 *                   f9  = 市盈率    f23 = 市净率     f57 = 股票代码
 *                   f58 = 股票名称
 *
 * @example GET /stockGet?type=1&code=600519
 */
const { request } = require('../utils/index.js');

/**
 * 获取股票详情
 */
module.exports = async (params = {}) => {
  const url = 'https://push2.eastmoney.com/api/qt/stock/get';
  return await request(url, {
    secid: `${params.type}.${params.code}`,
    fields:
      'f19,f20,f23,f24,f25,f26,f27,f28,f29,f30,f43,f44,f45,f46,f47,f48,f49,f50,f57,f58,f59,f60,f113,f114,f115,f116,f117,f127,f130,f131,f132,f133,f135,f136,f137,f138,f139,f140,f141,f142,f143,f144,f145,f146,f147,f148,f149,f152,f161,f162,f164,f165,f167,f168,f169,f170,f171,f174,f175,f177,f178,f198,f199,f294,f530,f531',
    invt: 2,
    ...params,
  });
};
