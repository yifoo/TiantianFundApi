# 🏢 基金公司

## 获取基金公司列表（格式化）

**路由**：`/getFundCorpList`

字段经格式化精简，label/value 结构适合前端选择器，含旗下基金数量、经理人数、成立日期。

**参数**：无

**示例** `/getFundCorpList`

```json
{
  "code": 200,
  "msg": "获取基金公司成功",
  "data": [
    {
      "label": "华夏基金",
      "value": "80000222",
      "ABBNAME": "HXJJ",
      "count": 238,
      "JJRS": 42,
      "estabdate": "1998-04-09"
    }
  ]
}
```

---

## 获取全部基金公司列表

**路由**：`/FundAllCompany`

来源为天天基金 `fundcomapi` 接口，字段含公司全称 `FNAME`，与 `/getFundCorpList` 数据来源不同。

**参数**：无

**示例** `/FundAllCompany`

```json
{
  "code": 200,
  "msg": "获取基金公司成功",
  "data": [
    {
      "label": "华夏基金",
      "value": "80000222",
      "ABBNAME": "HXJJ",
      "FNAME": "华夏基金管理有限公司"
    }
  ]
}
```

---

## 获取基金公司基础列表（完整字段）

**路由**：`/fundCompanyBaseList`

东方财富 `fundmobapi` 数据源，字段最全，含评级、管理规模等原始字段。

**参数**：无

**示例** `/fundCompanyBaseList`

```json
{
  "Datas": [
    {
      "COMPANYCODE": "80000222",
      "SNAME": "华夏基金",
      "ABBNAME": "HXJJ",
      "ESTABDATE": "1998-04-09",
      "FUNDCOUNT": 238,
      "JJRS": 42
    }
  ]
}
```

---

## 获取基金公司详细信息

**路由**：`/companyApi2`

通过不同的 `action` 参数获取基金公司的多维度数据。

**通用参数**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `cc` | string | ✅ | 基金公司 ID，从上述公司列表接口获取 |
| `action` | string | ✅ | 操作类型（见下文） |

---

### action = `fundcompanybaseinfo` 旗下基金和主题

**示例** `/companyApi2?cc=80065113&action=fundcompanybaseinfo`

```json
{
  "code": "1",
  "data": {
    "GLGM": "5161.31亿元",
    "Count": "245",
    "FDMC": "中欧基金管理有限公司",
    "ManagerCount": "39",
    "fundmaxsyl": 9.37,
    "NewFundList": [{
      "TypeName": "新发基金",
      "TypeCount": "2",
      "fundlist": [{
        "FCODE": "014474",
        "SHORTNAME": "中欧安悦一年定开债券发起",
        "DWJZ": "1.9845",
        "RZDF": "0.68",
        "FTYPE": "债券型-长债",
        "ISBUY": ""
      }]
    }],
    "CompanyTopic": {
      "List": [{ "TTYPENAME": "昨日触板", "Y": "64.29", "TWY": "112.15" }]
    }
  }
}
```

---

### action = `fundlist` 旗下基金列表

**额外参数**

| 参数 | 类型 | 说明 |
|------|------|------|
| `fundtype` | string | `all`=全部 `1`=股票 `2`=混合 `3`=债券 `4`=理财 `5`=货币 `7`=QDII `8`=指数 |
| `pi` | number | 页码 |
| `ps` | number | 每页条数 |
| `sf` | string | 排序字段：`SYL_Z` `SYL_Y` `SYL_1N` `SYL_JN` `SYL_LN` `LJJZ`(货币) |
| `sd` | string | 排序方向：`desc` |

**示例** `/companyApi2?cc=80065113&action=fundlist&fundtype=all&pi=1&ps=20&sf=SYL_1N&sd=desc`

```json
{
  "code": "1",
  "data": [{
    "FCODE": "015387",
    "SHORTNAME": "中欧沪深300指数增强A",
    "DWJZ": 0.9741,
    "SYL_Z": 1.54,
    "SYL_Y": -2.43,
    "SYL_LN": -2.59
  }]
}
```

---

### action = `categoryoffund` 旗下基金分类统计

**额外参数**

| 参数 | 类型 | 说明 |
|------|------|------|
| `ftype` | string | `25`=股票 `27`=混合 `31`=债券 `35`=货币 `37`=QDII `11`=指数 |

**示例** `/companyApi2?cc=80065113&action=categoryoffund&ftype=25`

```json
{
  "code": "1",
  "data": {
    "Info": {
      "FUNDCOUNT": 18,
      "TOTALSCALE": 395.36,
      "COUNTRANK": 34,
      "SCALERANK": 16,
      "FUNDSC": 122
    },
    "CompanyPartYield": {
      "SYL_1N": 13.23,
      "SYL_3N": 226.54,
      "AVG_1NRANK": 102
    }
  }
}
```

---

### action = `companyarchives` 基本情况

**示例** `/companyApi2?cc=80065113&action=companyarchives`

```json
{
  "code": "1",
  "data": {
    "FDMC": "中欧基金管理有限公司",
    "CLRQ": "2006-07-19",
    "ZCZB": "22000(万元)",
    "FRDB": "窦玉明",
    "Manager": "刘建平",
    "KFRX": "021-68609700",
    "GLGM": "5161.31亿元",
    "Count": "245",
    "ManagerCount": "39"
  }
}
```

---

### action = `companygmbd` 规模变动

**额外参数**：`pi`（页码）、`ps`（每页条数）、`sf=FSRQ`、`sd=desc`

**示例** `/companyApi2?cc=80065113&action=companygmbd&pi=1&ps=10`

```json
{
  "code": "1",
  "data": {
    "Datas": [{
      "FSRQ": "2022-03-31",
      "QMZFE": "403299550140.32",
      "QMJZC": "508333387806.35"
    }]
  }
}
```
