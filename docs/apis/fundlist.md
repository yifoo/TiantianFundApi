# 📋 基金列表

## 获取基金列表（按字母）

**路由**：`/fundNetList`

**参数**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `Letter` | string | | 字母过滤 `a`-`z`，不传返回全部 |
| `fundtype` | string | | 基金类型：`0`=全部 `25`=股票 `27`=混合 `35`=货币 `6`=QDII `4`=LOF `2949`=理财 |
| `SortColumn` | string | | 排序字段：`RDZF`=日涨幅  `DWJZ`=最新净值 |
| `Sort` | string | | 排序方向：`desc` / `asc` |
| `companyid` | string | | 基金公司 ID，从 `/getFundCorpList` 获取 |
| `pageIndex` | number | | 页码，从 1 开始 |
| `pagesize` | number | | 每页条数 |

**示例** `/fundNetList?Letter=h&pageIndex=1&pagesize=20`

```json
{
  "Datas": [
    { "FCODE": "003834", "SHORTNAME": "华夏能源革新股票A", "DWJZ": "3.114", "RZDF": "0.61" }
  ],
  "TotalCount": 128
}
```

---

## 获取基金列表（按类型）

**路由**：`/fundMNNetNewList`

**参数**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `FundType` | string | | 同 `/fundNetList` 的 `fundtype` |
| `SortColumn` | string | | `HLDWJZ`=最新净值  `LJJZ`=七日年化 |
| `Sort` | string | | `desc` / `asc` |
| `pageIndex` | number | | 页码 |
| `pagesize` | number | | 每页条数 |

**示例** `/fundMNNetNewList?FundType=25&SortColumn=HLDWJZ&Sort=desc&pageIndex=1&pagesize=20`

```json
{
  "Datas": [
    { "FCODE": "003834", "SHORTNAME": "华夏能源革新股票A", "DWJZ": "3.114" }
  ],
  "TotalCount": 4521
}
```

---

## 全量基金简要列表

**路由**：`/fundSuggestList`

> 详见 [搜索 → 全量基金简要列表](./search.md#全量基金简要列表)

---

## 基金公司列表（精简版）

**路由**：`/getFundCorpList`

格式化后的基金公司列表，字段面向前端选择器优化（label/value 结构）。

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

## 基金公司列表（完整版）

**路由**：`/fundCompanyBaseList`

返回字段更丰富，含公司代码、简称、缩写名、成立日期、旗下基金数量、基金经理人数。

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

## 全部基金公司列表（天天基金版）

**路由**：`/FundAllCompany`

来源为天天基金 `fundcomapi` 接口，字段含全称 FNAME，与 `/getFundCorpList` 数据来源不同。

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
