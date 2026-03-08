/*
 * @Author: wuhao 
 * @Date: 2025-11-26 07:32:14 
 * @Desc: 获取昨日准确基金持仓数据
 * @Last Modified by: wuhao
 * @Last Modified time: 2026-03-08 23:22:18
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
