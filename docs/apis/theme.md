# 🌐 基金主题

## 获取基金主题列表（全量）

**路由**：`/fundMNSubjectList`

返回天天基金平台所有基金主题分类，含主题名称、代码、旗下基金数量，用于主题浏览导航。

**参数**：无

**示例** `/fundMNSubjectList`

```json
{
  "Datas": [
    { "SUBJECTID": "BK0735", "SUBJECTNAME": "新能源", "FUNDCOUNT": 152 },
    { "SUBJECTID": "BK0499", "SUBJECTNAME": "半导体", "FUNDCOUNT": 98 },
    { "SUBJECTID": "BK0438", "SUBJECTNAME": "食品饮料", "FUNDCOUNT": 74 }
  ]
}
```

---

## 获取热门主题

**路由**：`/fundThemeList`

> 数据来源：Choice（东方财富旗下数据终端）

返回按热度排序的基金投资主题，含主题代码、名称、平均涨跌幅，适用于主题推荐场景。

**参数**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `RankItems` | string | | 排序维度（见下表） |
| `RankVectors` | string | | 排序方向：`desc`=降序  `asc`=升序 |
| `category` | string | | 类别：`2`=全部  `0`=行业  `1`=概念 |

**RankItems 可选值**

| 值 | 说明 |
|----|------|
| `ZDF` | 涨幅（实时） |
| `SYL_W` | 涨幅（近1周） |
| `SYL_M` | 涨幅（近1月） |
| `SYL_Q` | 涨幅（近3月） |
| `SYL_1N` | 涨幅（近1年） |
| `SYL_JN` | 涨幅（今年以来） |
| `Cinflow` | 资金流（实时） |
| `Cinflow_W` | 资金流（近1周） |
| `ZS_3` | 涨速（3分钟） |
| `ZS_5` | 涨速（5分钟） |

**示例** `/fundThemeList?RankItems=SYL_1N&RankVectors=desc&category=2`

```json
{
  "data": [
    { "SUBJECTID": "BK0735", "SUBJECTNAME": "新能源", "INCREASE": "43.5" },
    { "SUBJECTID": "BK0499", "SUBJECTNAME": "半导体", "INCREASE": "28.2" }
  ]
}
```

---

## 获取主题焦点列表

**路由**：`/fundThemeFocusList`

> 数据来源：Choice

返回当前市场热点主题的聚合信息，含主题名称、近期涨跌幅及关联重点基金，常用于首页热点主题推荐模块。

**参数**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `code` | string | | 焦点所属 code，可不填 |

**示例** `/fundThemeFocusList`

```json
{
  "data": [
    {
      "name": "新能源赛道",
      "increase": "3.25",
      "funds": [
        { "FCODE": "003834", "SHORTNAME": "华夏能源革新股票A" }
      ]
    }
  ]
}
```

---

## 获取行业主题板块列表

**路由**：`/getBKList`

> 参见 [基金筛选 → 获取行业板块列表](./select.md#获取行业板块列表)
