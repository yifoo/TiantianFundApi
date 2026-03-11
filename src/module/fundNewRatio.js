/**
 * @api GET /fundNewRatio
 * @desc 获取基金最新实时估值（支持单只及批量，含备用数据源）
 * @desc 优先从 fundgz.1234567.com.cn 获取盘中估值，若估算涨跌幅为 0
 *       则自动切换至基金速查网（dayfund.cn）作为备用数据源。
 *       支持单只或多只基金，批量时并发请求，单只失败不影响整体。
 *
 * @param {string} fcode - [必填] 基金代码，单只或逗号分隔多只
 *                         单只示例：003834
 *                         批量示例：003834,001975,110003
 *
 * @returns {object}
 * @returns {number} code              - 200 成功
 * @returns {any}    data              - 单只时返回对象，批量时返回数组
 * @returns {string} data.fundcode     - 基金代码
 * @returns {string} data.jzrq         - 净值日期
 * @returns {number} data.dwjz         - 单位净值
 * @returns {number} data.gsz          - 估算净值（盘中实时）
 * @returns {number} data.gszzl        - 估算涨跌幅(%)
 * @returns {string} data.gztime       - 估值更新时间
 *
 * @example GET /fundNewRatio?fcode=003834
 * @example GET /fundNewRatio?fcode=003834,001975,110003
 */
const { get } = require('../utils/index.js');
const logger = require('../utils/logger.js');

/**
 * ? 基金速查网接口
 * @param {基金代码} code 
 * @returns {}
 */
const getNewNet = async (code) => {
  let url = `https://m.dayfund.cn/ajs/ajaxdata.shtml?showtype=getfundvalue&fundcode=${code}`
  let resp = await get(url);
  let data = resp.data.split("|")
  return {
    fundcode: code,
    jzrq: parseFloat(data[0]),
    dwjz: parseFloat(data[1]),
    gsz: parseFloat(data[7]) || parseFloat(data[1]),
    gszzl: parseFloat(data[5]) || parseFloat(data[4]),
    gztime: `${data[9]} ${data[10]}`
  }
}
module.exports = async (params = {}) => {
  let { fcode } = params
  let fcodeList = fcode.split(",")
  if (fcodeList.length === 1) {
    const url = `https://fundgz.1234567.com.cn/js/${fcodeList[0]}.js?rt=${new Date().getTime()}`;
    let resp = await get(url);
    if (resp.code === 200 && resp.data && typeof resp.data === 'string') {
      let data = resp.data.slice("jsonpgz".length + 1, - 2)
      let parseJson = data ? JSON.parse(data) : {}
      if (Object.keys(parseJson).length && parseInt(parseJson.gszzl) != 0) {
        return {
          code: 200,
          data: parseJson
        }
      } else {
        let data = await getNewNet(fcodeList[0])
        return {
          code: 200,
          data
        }
      }
    } else {
      let data = await getNewNet(fcodeList[0])
      return {
        code: 200,
        data
      }
    }

  } else {
    let url = '';
    // 并发执行，单只失败不阻断整体
    const results = await Promise.allSettled(fcodeList.map(async (element) => {
      url = `https://fundgz.1234567.com.cn/js/${element}.js?rt=${new Date().getTime()}`;
      let resp = await get(url);
      if (resp.code === 200) {
        try {
          if (resp.data && typeof resp.data === 'string') {
            let data = resp.data.slice("jsonpgz".length + 1, - 2)
            let parseJson = data ? JSON.parse(data) : {}
            if (Object.keys(parseJson).length && parseJson.gszzl != "0.00") {
              return parseJson
            } else {
              let data = await getNewNet(element)
              logger.info('element:1 ', element);
              return data
            }
          } else {
            logger.info('resp: ', resp.code);
          }
        } catch (e) {
          logger.info('efuu: ', e);
        }
      } else {
        logger.info('element: ', element);
        let data = await getNewNet(element)
        return data
      }
    }));

    return {
      code: 200,
      data: results
    }
  }

};
