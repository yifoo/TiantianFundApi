/**
 * @api GET /getStockRatio
 * @desc 获取基金持仓股票列表及实时行情（两步聚合）
 * @desc 第一步从天天基金获取基金最新持仓股票列表，
 *       第二步并发从东方财富行情接口获取每只持仓股的实时价格和涨跌幅，
 *       最终返回带实时行情的持仓明细，适合持仓分析页。
 *       注意：行情接口失败时仍会返回持仓基础数据，price/ratio 字段将缺失。
 *
 * @param {string} FCODE - [必填] 基金代码，例：003834
 *
 * @returns {object}
 * @returns {number} code              - 200 成功（含降级成功）
 * @returns {Array}  data              - 持仓股票列表（附实时行情）
 * @returns {string} data[].GPDM       - 股票代码
 * @returns {string} data[].GPJC       - 股票简称
 * @returns {string} data[].JZBL       - 占净值比例(%)
 * @returns {string} data[].MKTCAP     - 持仓市值（元）
 * @returns {string} data[].NEWTEXCH   - 交易所
 * @returns {number} data[].price      - 实时股价（元，行情接口成功时才有）
 * @returns {number} data[].ratio      - 实时涨跌幅%（行情接口成功时才有）
 *
 * @example GET /getStockRatio?FCODE=003834
 */
const { request, get } = require('../utils/index.js');

module.exports = async (params = {}) => {
  const posUrl = 'https://fundcomapi.tiantianfunds.com/mm/FundMNewApi/FundInverstPosition';

  let fundStocks = [];

  try {
    // Step 1: 获取基金持仓列表
    const resp = await request(posUrl, {
      ...params,
      appType: 'ttjj',
      plat: 'Iphone',
      product: 'EFund',
      version: '6.8.2',
    });

    fundStocks = resp?.data?.fundStocks || [];
    if (!fundStocks.length) return { code: 200, data: fundStocks };

    // Step 2: 批量查询持仓股票的实时行情
    const codeList = fundStocks.map((item) => `${item.NEWTEXCH}.${item.GPDM}`);

    const priceUrl = 'https://push2.eastmoney.com/api/qt/ulist.np/get';
    const priceRes = await get(
      priceUrl,
      {
        fltt: 2,
        invt: 2,
        fields: 'f2,f3,f4,f5,f6,f7,f8,f9,f11,f12,f13,f14',
        secids: codeList.join(','),
      },
      {
        Host: 'push2.eastmoney.com',
        GTOKEN: 'BF0EE8509F444F118390658845558510',
        clientInfo: 'ttjj-iPad Pro 3 (12.9-inch)-iOS-iPadOS17.7',
        'MP-VERSION': '1.3.6',
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'EMProjJijin/6.8.3 (iPad; iOS 17.7; Scale/2.00)',
        Referer: 'https://mpservice.com/7d7b3460cd40444ba58cdabdfae34442/release/pages/option/index',
      }
    );

    if (priceRes.code === 200) {
      const priceMap = new Map(
        (priceRes.data?.data?.diff || []).map((item) => [item.f12, item])
      );
      fundStocks = fundStocks.map((item) => {
        const price = priceMap.get(item.GPDM);
        return price ? { ...item, price: price.f2, ratio: price.f3 } : item;
      });
    }

    return { code: 200, data: fundStocks };
  } catch (e) {
    // 即使行情请求失败，也返回持仓基础数据
    return { code: 200, data: fundStocks };
  }
};
