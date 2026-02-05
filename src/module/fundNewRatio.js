/*
 * @Author: wuhao 
 * @Date: 2025-11-26 07:32:14 
 * @Desc: 获取昨日准确基金持仓数据
 * @Last Modified by: wuhao
 * @Last Modified time: 2026-02-05 12:44:11
 */
const { request, get } = require('../utils/index.js');
let data = {
  '000217': 'jsonpgz({"fundcode":"022365","name":"华安黄金ETF联接C","jzrq":"2026-02-03","dwjz":"3.8040","gsz":"3.6918","gszzl":"-2.95","gztime":"2026-02-04 15:00"});',
  '025209': 'jsonpgz({"fundcode":"025209","name":"永赢先锋半导体智选混合C","jzrq":"2026-02-03","dwjz":"3.8040","gsz":"3.6918","gszzl":"-2.95","gztime":"2026-02-04 15:00"});',
  '018028': 'jsonpgz({"fundcode":"022365","name":"嘉实中证高端装备细分50ETF联接C","jzrq":"2026-02-03","dwjz":"3.8040","gsz":"3.6918","gszzl":"-2.95","gztime":"2026-02-04 15:00"});',
  '022365': 'jsonpgz({"fundcode":"022365","name":"永赢科技智选混合发起C","jzrq":"2026-02-03","dwjz":"3.8040","gsz":"3.6918","gszzl":"-2.95","gztime":"2026-02-04 15:00"});',
  '014855': 'jsonpgz({"fundcode":"022365","name":"永赢科技智选混合发起C","jzrq":"2026-02-03","dwjz":"3.8040","gsz":"3.6918","gszzl":"-2.95","gztime":"2026-02-04 15:00"});',
  '015790': 'jsonpgz({"fundcode":"022365","name":"永赢高端装备智选混合C","jzrq":"2026-02-03","dwjz":"3.8040","gsz":"3.6918","gszzl":"-2.95","gztime":"2026-02-04 15:00"});',
}

module.exports = async (params = {}) => {
  let { fcode } = params
  let fcodeList = fcode.split(",")
  if (fcodeList.length === 1) {
    const url = `https://fundgz.1234567.com.cn/js/${fcodeList[0]}.js?rt=${new Date().getTime()}`;
    let resp = await get(url);
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
  } else {
    let url = ''; fundsRatio = []
    for (let index = 0; index < fcodeList.length; index++) {
      const element = fcodeList[index];
      url = `https://fundgz.1234567.com.cn/js/${element}.js?rt=${new Date().getTime()}`;
      let resp = await get(url);
      try {
        if (typeof resp === 'string') {
          let parseJson = resp.slice("jsonpgz".length + 1, - 2)
          if (parseJson.length) {
            fundsRatio.push(JSON.parse(parseJson))
          } else {
            fundsRatio.push({ "fundcode": element })
          }
        } else {
          console.log('resp: ', resp.code);
        }
      } catch (e) {
        console.log('e: ', e);
      }
    }
    return {
      code: 200,
      data: fundsRatio
    }
  }

};
