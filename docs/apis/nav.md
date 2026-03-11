# 💰 基金净值

## 获取基金最新实时估值

**路由**：`/fundNewRatio`

优先从天天基金获取盘中估值；若估算涨跌幅为 0，自动切换至基金速查网作为备用数据源。支持单只或批量查询，批量时并发请求，单只失败不影响整体。

**参数**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `fcode` | string | ✅ | 基金代码，单只或逗号分隔多只，例：`003834` 或 `003834,001975` |

**示例（单只）** `/fundNewRatio?fcode=003834`

```json
{
  "code": 200,
  "data": {
    "fundcode": "003834",
    "name": "华夏能源革新股票A",
    "jzrq": "2022-05-25",
    "dwjz": "3.095",
    "gsz": 3.114,
    "gszzl": 0.61,
    "gztime": "2022-05-25 15:00"
  }
}
```

**示例（批量）** `/fundNewRatio?fcode=003834,001975`

```json
{
  "code": 200,
  "data": [
    { "status": "fulfilled", "value": { "fundcode": "003834", "gsz": 3.114, "gszzl": 0.61, ... } },
    { "status": "fulfilled", "value": { "fundcode": "001975", "gsz": 2.451, "gszzl": -0.32, ... } }
  ]
}
```

---

## 批量获取自选基金净值及收益率

**路由**：`/FundsNewNet`

一次性返回多只基金的最新净值、实时估值及各阶段收益率，适合自选列表页。

**参数**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `FCODES` | string | ✅ | 基金代码列表，逗号分隔，例：`003834,001975` |

**示例** `/FundsNewNet?FCODES=003834,001975`

```json
[{
  "FCODE": "003834",
  "SHORTNAME": "华夏能源革新股票A",
  "NAV": 3.095,
  "ACCNAV": 3.095,
  "NAVCHGRT": 0.61,
  "GSZ": 3.114,
  "GSZZL": 0.61,
  "GZTIME": "2022-05-25 15:00",
  "SYL_Z": -2.03,
  "SYL_Y": 12.74,
  "SYL_1N": 43.73,
  "SYL_3N": 76.77,
  "SYL_LN": 84.8,
  "ZJL": null,
  "ISBUY": "1",
  "PDATE": "2022-05-25"
}]
```

---

## 批量获取实时估值（小倍养基）

**路由**：`/FundsValuatioNet`

通过小倍养基 API 获取盘中实时估值，支持自定义日期查询。

**参数**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `codeList` | string | ✅ | 基金代码列表，JSON 数组字符串或单个代码，例：`["003834","001975"]` |
| `date` | string | ✅ | 查询日期，格式 `YYYY-MM-DD` |

**示例** `/FundsValuatioNet?codeList=["003834","001975"]&date=2024-03-08`

```json
{
  "data": [
    { "code": "003834", "name": "华夏能源革新股票A", "gsz": 3.114, "gszzl": 0.61, "gztime": "2024-03-08 14:50" }
  ]
}
```

---

## 获取净值估算明细（盘中逐分钟）

**路由**：`/fundVarietieValuationDetail`

在交易时段返回逐分钟估算净值序列，非交易时段返回最近交易日数据。仅指数型基金有完整估值数据。

**参数**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `FCODE` | string | ✅ | 基金代码，例：`470007` |

**示例** `/fundVarietieValuationDetail?FCODE=470007`

```json
[
  { "time": "09:30", "gsz": 1.2341, "gszzl": 0.23 },
  { "time": "09:31", "gsz": 1.2356, "gszzl": 0.35 }
]
```

---

## 获取基金历史净值列表

**路由**：`/fundMNHisNetList`

按分页返回历史每日净值记录，含单位净值、累计净值、日涨跌幅、申赎状态。

**参数**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `FCODE` | string | ✅ | 基金代码 |
| `pageIndex` | number | | 页码，从 1 开始 |
| `pagesize` | number | | 每页条数，最大 40 |
| `SDATE` | string | | 开始日期，格式 `YYYY-MM-DD` |
| `EDATE` | string | | 结束日期，格式 `YYYY-MM-DD` |

**示例** `/fundMNHisNetList?FCODE=003834&pageIndex=1&pagesize=20`

```json
{
  "Datas": [{
    "FSRQ": "2022-05-25",
    "DWJZ": "3.114",
    "LJJZ": "3.114",
    "JZZZL": "0.61",
    "SGZT": "限大额",
    "SHZT": "开放赎回"
  }],
  "TotalCount": 1230
}
```

---

## 获取基金净值走势（与指数对比）V2

**路由**：`/FundVPageAccV2`

返回指定时间范围内的净值走势，支持叠加对比指数曲线。（推荐使用，替代 `/fundVPageAcc`）

**参数**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `fcode` | string | ✅ | 基金代码，例：`003834` |
| `indexCode` | string | | 对比指数代码（见下表） |
| `range` | string | | 时间范围：`1M` `3M` `6M` `1Y` `3Y` `5Y` `MAX`，不传返回全部 |

**常用指数代码**

| 指数名称 | 代码 |
|----------|------|
| 上证指数 | `000001` |
| 深证成指 | `399001` |
| 创业板指 | `399006` |
| 沪深300 | `000300` |
| 中证500 | `000905` |
| 上证50 | `000016` |

**示例** `/FundVPageAccV2?fcode=003834&range=1Y&indexCode=000300`

```json
{
  "data": {
    "PDATE": "2023-03-30",
    "YIELD": "-0.1",
    "INDEXYIELD": "-0.06",
    "FUNDTYPEYIELD": "1.86",
    "BENCHQUOTE": "5.71"
  },
  "totalCount": 245,
  "expansion": {
    "syl": "73.75",
    "MAXRETRA": "25.93"
  }
}
```

---

## 获取基金累计收益走势

**路由**：`/fundVPageAcc`

**参数**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `FCODE` | string | ✅ | 基金代码 |
| `RANGE` | string | | 范围：`n`=年（`3n`=3年）`y`=月（`3y`=3月）`jn`=今年来  `ln`=成立以来 |
| `INDEXCODE` | string | | 对比指数代码（同上表） |

**示例** `/fundVPageAcc?FCODE=003834&RANGE=1n&INDEXCODE=000300`

```json
{
  "Datas": [{
    "PDATE": "2022-05-25",
    "YIELD": "6.04",
    "INDEXYIELD": "4.41",
    "FUNDTYPEYIELD": "8.79",
    "BENCHQUOTE": null
  }]
}
```

---

## 获取基金单位净值走势

**路由**：`/fundVPageDiagram`

**参数**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `FCODE` | string | ✅ | 基金代码 |
| `RANGE` | string | | 同 `/fundVPageAcc` 的 `RANGE` |
| `POINTCOUNT` | number | | 点计数，建议传 `500` |

**示例** `/fundVPageDiagram?FCODE=003834&RANGE=1n`

```json
{
  "Datas": [{
    "FSRQ": "2022-05-25",
    "DWJZ": "3.114",
    "LJJZ": "3.114",
    "JZZZL": "0.61"
  }]
}
```

---

## 批量获取自选收益数据（小倍养基）

**路由**：`/getNetNav`

通过小倍养基 API 获取指定日期的收益情况，含当日收益额与收益率。

**参数**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `codeList` | string | ✅ | 基金代码 JSON 数组字符串，例：`["003834","001975"]` |
| `date` | string | ✅ | 查询日期，格式 `YYYY-MM-DD` |

**示例** `/getNetNav?codeList=["003834","001975"]&date=2024-03-08`

```json
{
  "data": [
    { "code": "003834", "name": "华夏能源革新股票A", "gain": 12.5, "gainRatio": 0.61 }
  ]
}
```
