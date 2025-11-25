const { get } = require('../utils/index.js');
const dayjs = require('dayjs')

/**
 * 获取主题焦点列表
 */
module.exports = async (params = {}, ctx) => {
  const url = 'https://fund.eastmoney.com/data/rankhandler.aspx';
  let sort = JSON.parse(params.sort)
  let sortKey = Object.keys(sort).length > 0 ? Object.keys(sort)[0] : ''
  let sortItem = Object.keys(sort).length > 0 ? sort[sortKey].slice(0, -3) : 'desc';
  let sc = 'rzdf'
  switch (sortKey) {
    case "dayRatio": sc = 'rzdf'; break;
    case "oneWeek": sc = 'zzf'; break;
    case "oneMonth": sc = '1yzf'; break;
    case "threeMonth": sc = '3yzf'; break;
    case "sixMonth": sc = '6yzf'; break;
    case "oneYear": sc = '1nzf'; break;
    case "twoYear": sc = '2nzf'; break;
    case "threeYear": sc = '3nzf'; break;
    case "thisYear": sc = 'jnzf'; break;
    case "created": sc = 'lnzf'; break;
    default: sc = "rzdf"; break;
  }
  params = {
    op: 'ph',
    dt: 'kf',
    ft: 'all',
    gs: params.gs,
    // sc: 'zzf',//rzdf,zzf,1yzf,3yzf,6yzf,1nzf,2nzf,3nzf,jnzf,lnzf
    sc,
    st: sortItem,
    sd: dayjs().subtract(1, 'year').format('YYYY-MM-DD'),
    ed: dayjs().format("YYYY-MM-DD"),
    pi: parseInt(params.current),
    pn: parseInt(params.pageSize),
    dx: 1
    // ...params,
  }
  let res = await get(url, params, { Host: 'fund.eastmoney.com', Referer: 'https://fund.eastmoney.com/data/fundranking.html', "sec-fetch-dest": "script", "sec-fetch-mode": "no-cors", "sec-fetch-site": "same-origin", "user-agent": 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36' });
  try {
    // 提取JSON对象部分
    var rankData = {}
    eval(res)
    let datas = rankData.datas
    let data = []
    data = datas.map(item => {
      let arr = item.split(",")
      return {
        code: arr[0],
        short_name: arr[1],
        date: arr[3],
        JJJZ: arr[4],
        LJJZ: arr[5],
        dayRatio: arr[6],
        oneWeek: arr[7],
        oneMonth: arr[8],
        threeMonth: arr[9],
        sixMonth: arr[10],
        oneYear: arr[11],
        twoYear: arr[12],
        threeYear: arr[13],
        thisYear: arr[14],
        created: arr[15],
        createdDate: arr[16],
        serviceFee: arr[20],
      }
    })
    rankData.datas = data
    return {
      code: 200,
      data: rankData,
      msg: '获取成果'
    }
  } catch (error) {
    console.log('error: ', error);
    return {
      code: 400,
      msg: '获取失败',
      data: error
    }
  }

};
