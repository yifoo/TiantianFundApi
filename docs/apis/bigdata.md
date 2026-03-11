# 📈 大数据榜单

## 获取大数据榜单列表

**路由**：`/bigDataList`

返回天天基金 App 首页大数据模块的所有榜单入口，包含人气榜、资金流入榜、上涨概率榜等，可获取榜单 ID 供后续查询详情。

**参数**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `ClCategory` | string | | 榜单类型：`0`=全部  `1`=独家数据  `2`=策略精选  `3`=主题热榜 |

**示例** `/bigDataList?ClCategory=1`

```json
[{
  "ClType": "001",
  "SType": "5",
  "ClCategory": "1",
  "Title": "大家都在买",
  "SubTitle": "近1月购买人数最多",
  "Description": "展示近一月购买人数最多的基金...",
  "FontColor": "#FF4400",
  "FundCode": "161725",
  "FundName": "招商中证白酒指数(LOF)A",
  "SYL": "54",
  "ShowunitMark": "万人",
  "PeriodText": "购买"
}]
```

---

## 获取大数据榜单详情

**路由**：`/bigDataDetail`

返回指定大数据榜单的详细内容（如热门搜索、资金流入榜等），结构随榜单类型不同而变化。

**参数**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `cltype` | string | ✅ | 榜单 ID，从 `/bigDataList` 的 `ClType` 字段获取，例：`001` |

**示例** `/bigDataDetail?cltype=001`

```json
{
  "Datas": [{
    "FCODE": "161725",
    "SHORTNAME": "招商中证白酒指数(LOF)A",
    "Value": "12.3",
    "UnitMark": "万人",
    "DWJZ": "1.423"
  }]
}
```
