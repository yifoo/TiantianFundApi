/*
 * @Author: wuhao 
 * @Date: 2025-11-26 07:32:14 
 * @Desc: 获取昨日准确基金持仓数据
 * @Last Modified by: wuhao
 * @Last Modified time: 2026-02-27 23:05:29
 */
const { get } = require('../utils/index.js');

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
    let url = ''; fundsRatio = []
    for (let index = 0; index < fcodeList.length; index++) {
      const element = fcodeList[index];
      url = `https://fundgz.1234567.com.cn/js/${element}.js?rt=${new Date().getTime()}`;
      let resp = await get(url);
      if (resp.code === 200) {
        try {
          if (resp.data && typeof resp.data === 'string') {
            let data = resp.data.slice("jsonpgz".length + 1, - 2)
            let parseJson = data ? JSON.parse(data) : {}
            if (Object.keys(parseJson).length && parseInt(parseJson.gszzl) != 0) {
              fundsRatio.push(parseJson)
            } else {
              let data = await getNewNet(element)
              fundsRatio.push(data)
            }
          } else {
            console.log('resp: ', resp.code);
          }
        } catch (e) {
          console.log('efuu: ', e);
        }
      } else {
        console.log('element: ', element);
        let data = await getNewNet(element)
        fundsRatio.push(data)
      }
    }
    return {
      code: 200,
      data: fundsRatio
    }
  }

};
