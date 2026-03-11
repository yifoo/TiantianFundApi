# 🎯 基金筛选

## 获取筛选条件配置

**路由**：`/conditionListForRank`

返回排行榜页面可用的所有筛选维度和选项，用于构建筛选器 UI，通常与 `/fundsSelect` 配合使用。

**参数**：无

**示例** `/conditionListForRank`

```json
{
  "code": 200,
  "msg": "获取成功",
  "data": [
    {
      "name": "基金类型",
      "child": [
        { "name": "全部", "value": "" },
        { "name": "股票型", "value": "001" },
        { "name": "混合型", "value": "002" }
      ]
    },
    {
      "name": "风险等级",
      "child": [
        { "name": "低风险", "value": "1" },
        { "name": "中低风险", "value": "2" }
      ]
    }
  ]
}
```

---

## 获取筛选页模块配置

**路由**：`/getModuleConfig`

返回基金条件筛选页的动态模块布局配置，定义筛选模块的展示顺序与标题，适合前端动态渲染筛选面板。

**参数**：无

**示例** `/getModuleConfig`

```json
{
  "code": 200,
  "data": [
    {
      "title": "收益排行",
      "items": [
        { "name": "近1年", "value": "SYL_1N" },
        { "name": "近3年", "value": "SYL_3N" }
      ]
    }
  ]
}
```

---

## 多条件筛选基金

**路由**：`/fundsSelect`

支持按基金类型、风险等级、申购状态、行业主题等多维度条件筛选，分页返回结果并附带总数。

**参数**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `sort` | string | ✅ | 排序配置 JSON 字符串，例：`{"yearSyl":"descend"}` |
| `current` | number | ✅ | 页码，从 1 开始 |
| `pageSize` | number | ✅ | 每页条数 |
| `rsbType` | string | | 基金类型代码，从 `/conditionListForRank` 获取 |
| `bkcodes` | string | | 行业代码，从 `/getBKList` 获取，多选逗号分隔 |
| `stageRanking` | string | | 阶段排名过滤 |

**sort 可选 key**

| key | 说明 |
|-----|------|
| `gsZzl` | 估算涨跌幅 |
| `daySyl` | 日收益率 |
| `weekSyl` | 近1周收益率 |
| `monthSyl` | 近1月收益率 |
| `qsyl` | 近3月收益率 |
| `hySyl` | 近6月收益率 |
| `yearSyl` | 近1年收益率 |
| `twySyl` | 近2年收益率 |
| `trySyl` | 近3年收益率 |
| `fySyl` | 近5年收益率 |
| `sySyl` | 成立以来 |
| `lnSyl` | 近来收益率 |

value 可选：`ascend`（升序）/ `descend`（降序）

**示例** `/fundsSelect?sort={"yearSyl":"descend"}&current=1&pageSize=20`

```json
{
  "code": 200,
  "msg": "获取成功",
  "data": [
    {
      "FCODE": "003834",
      "SHORTNAME": "华夏能源革新股票A",
      "SYL_1N": "43.73",
      "ISBUY": "1",
      "MAXSG": 100000000000
    }
  ],
  "total": 4521
}
```

---

## 获取行业板块列表

**路由**：`/getBKList`

返回基金筛选页可用的全部行业主题板块，板块代码可传给 `/fundsSelect` 的 `bkcodes` 参数。

**参数**：无

**示例** `/getBKList`

```json
{
  "code": 200,
  "data": [
    { "bkCode": "BK0438", "bkName": "食品饮料" },
    { "bkCode": "BK0735", "bkName": "新能源" },
    { "bkCode": "BK0499", "bkName": "半导体" }
  ]
}
```

---

## 获取行业分类列表

**路由**：`/getIndustryList`

返回用于基金条件筛选的行业分类树，与 `/getBKList` 数据来源不同，层级更细。

**参数**：无

**示例** `/getIndustryList`

```json
{
  "code": 200,
  "data": [
    {
      "code": "A01",
      "name": "农业",
      "child": [
        { "code": "A0101", "name": "种植业" }
      ]
    }
  ]
}
```

---

## 获取行业板块研报数据

**路由**：`/getBkField`

返回指定行业板块（默认申万行业 016 层级）的相关研报列表，含报告标题、机构、发布日期等。

**参数**：无（当前接口固定查询 `bkCode=016`）

**示例** `/getBkField`

```json
{
  "code": 200,
  "data": {
    "list": [
      { "title": "新能源行业周报", "org": "中信证券", "date": "2024-03-08", "rating": "增持" }
    ]
  }
}
```
