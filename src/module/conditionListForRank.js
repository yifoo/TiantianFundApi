/**
 * @api GET /conditionListForRank
 * @desc 获取基金排行榜的筛选条件配置
 * @desc 返回排行榜页面可用的所有筛选维度和选项（基金类型、交易状态、
 *       风险等级等），用于构建前端筛选器，通常与 fundsRankHandler 配合使用。
 *
 * @param {object} params - 无需传入参数（接口固定返回全量配置）
 *
 * @returns {object}
 * @returns {number} code          - 200 成功 / 400 失败
 * @returns {string} msg           - 结果描述
 * @returns {Array}  data          - 筛选条件数组，每项为一个筛选维度
 * @returns {string} data[].name   - 筛选维度名称
 * @returns {Array}  data[].child  - 该维度下的可选项列表
 *
 * @example GET /conditionListForRank
 */
const { post } = require('../utils/index.js');

module.exports = async () => {
  const url = 'https://condition.tiantianfunds.com/condition/conditionFund/conditionListForRank';

  const params = {
    plat: 'Iphone',
    product: 'EFund',
    rankSy: 1,
    showHK: 1,
    version: '6.8.2',
    deviceid: '94084AB3-7573-5EA7-BA65-C0DFRD33643B',
  };

  const header = {
    Host: 'condition.tiantianfunds.com',
    clientInfo: 'ttjj-iPad Pro 3 (12.9-inch)-iOS-iPadOS17.7',
    Referer: 'https://mpservice.com/fund94570b183d8ea9/release/pages/Rank/index',
  };

  try {
    const res = await post(url, params, header);
    return { code: 200, msg: '获取成功', data: res.Data };
  } catch (error) {
    return { code: 400, msg: '获取失败', data: null };
  }
};
