# 🔍 搜索

## 基金搜索

**路由**：`/fundSearch`

支持按基金、基金经理、基金公司进行关键词搜索，支持代码、名称、拼音简拼输入。

**参数**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `key` | string | ✅ | 搜索关键词（基金名/代码/简拼，或字母 a-z） |
| `m` | string | ✅ | 搜索类别：`1`=搜基金  `3`=按字母搜基金公司  `7`=搜基金经理  `8`=搜基金公司 |

**示例**

搜索基金 `/fundSearch?m=1&key=新能源`：

```json
[{
  "_id": "003834",
  "CODE": "003834",
  "NAME": "华夏能源革新股票A",
  "JP": "HXNYGXGPA",
  "CATEGORY": 700,
  "CATEGORYDESC": "基金",
  "FundBaseInfo": {
    "FCODE": "003834",
    "DWJZ": 3.114,
    "FSRQ": "2022-05-25",
    "FTYPE": "股票型",
    "ISBUY": "1",
    "JJGS": "华夏基金",
    "SHORTNAME": "华夏能源革新股票A"
  }
}]
```

搜索基金经理 `/fundSearch?m=7&key=w`：

```json
[{
  "MgrId": "30728448",
  "MgrName": "徐维君",
  "AbbName": "XWJ",
  "JJGS": "方正富邦基金",
  "JJGSID": "80174741",
  "MatchCount": 2
}]
```

搜索基金公司（按字母）`/fundSearch?m=3&key=w`：

```json
[{
  "JJGSID": "81052915",
  "JJGS": "安信证券资产",
  "QXJJ": [
    { "FCODE": "970003", "SHORTNAME": "安信瑞鸿中短债A" }
  ]
}]
```

搜索基金公司 `/fundSearch?m=8&key=w`：

```json
[{
  "JJGSID": "80000031",
  "JJGS": "东吴证券",
  "JJGSJP": "DWZQ"
}]
```

---

## 基金名称搜索（带分页）

**路由**：`/fundSearchInfoByName`

按名称关键词搜索基金，返回更丰富的字段，支持分页。

**参数**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `key` | string | ✅ | 搜索关键词，例：`华夏` |
| `orderType` | string | | 排序：`1`=按热度  `2`=默认（推荐） |
| `pageindex` | number | | 页码，从 1 开始，默认 1 |
| `pagesize` | number | | 每页条数，默认 20 |

**示例** `/fundSearchInfoByName?key=华夏&pageindex=1&pagesize=20`

```json
{
  "totalCount": 647,
  "data": [{
    "fcode": "000075",
    "ftype": "QDII",
    "shortname": "华夏恒生ETF联接现汇",
    "hightlight": "000075_<font color='#ff4400'>华夏</font>恒生ETF联接现汇",
    "abbname": "HXHSETFLJXH"
  }]
}
```

---

## 全量基金简要列表

**路由**：`/fundSuggestList`

返回所有在售基金的极简列表（仅代码+名称+简拼），体积小，适合作为本地搜索候选词库缓存。

**参数**：无

**示例** `/fundSuggestList`

```json
[
  ["003834", "华夏能源革新股票A", "HXNYGXGPA"],
  ["110003", "易方达上证50增强A", "YFDSZ50ZQA"]
]
```

---

## 基金指数列表

**路由**：`/getFundIndex`

返回可用于净值走势对比的参考指数列表（含沪深300、中证500等），常用于净值图指数选择器。

**参数**：无

**示例** `/getFundIndex`

```json
{
  "code": 200,
  "msg": "获取基金指数成功",
  "data": [
    { "INDEXCODE": "000300", "INDEXNAME": "沪深300", "INDEXQP": "..." },
    { "INDEXCODE": "000905", "INDEXNAME": "中证500", "INDEXQP": "..." },
    { "INDEXCODE": "000016", "INDEXNAME": "上证50",  "INDEXQP": "..." }
  ]
}
```
