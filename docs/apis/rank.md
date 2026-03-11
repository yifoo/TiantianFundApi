# 🏆 基金排行

## 获取基金排行（A股）

**路由**：`/fundMNRank`

天天基金网基金排行，支持按类型过滤和多维度排序。

**参数**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `FundType` | string | | 基金类型（见下表） |
| `SortColumn` | string | | 排序字段（见下表） |
| `Sort` | string | | `desc`=降序  `asc`=升序 |
| `pageIndex` | number | | 页码，从 1 开始 |
| `pageSize` | number | | 每页条数，最大 30 |
| `CompanyId` | string | | 基金公司 ID，从 `/getFundCorpList` 获取 |
| `BUY` | string | | `true`=仅显示可购  `false`=全部 |
| `ISABNORMAL` | string | | `true`=排除异常涨幅  `false`=全部 |
| `RISKLEVEL` | string | | 风险等级，多选逗号分隔：`1`=低 `2`=中低 `3`=中 `4`=中高 `5`=高 |
| `RLEVEL_SZ` | string | | 上海证券评级，多选：`5` `4` `3` `2` `1` |
| `ENDNAV` | string | | 规模区间，多选：`1`=≤2亿 `2`=2-10亿 `3`=10-50亿 `4`=50-100亿 `5`=>100亿 |
| `ESTABDATE` | string | | 成立年限，多选：`1`=≤1年 `2`=1-2年 `3`=2-3年 `4`=3-4年 `5`=4-5年 `6`=>5年 |
| `TOPICAL` | string | | 基金主题代码，从 `/fundMNSubjectList` 获取 |
| `CLTYPE` | string | | 筛选方案，从 `/bigDataList` 获取 |
| `DISCOUNT` | string | | 申购费率：`0`=0费率  `1`=1折 |

**基金类型 FundType**

| 值 | 类型 |
|----|------|
| `0` | 全部 |
| `25` | 股票型 |
| `27` | 混合型 |
| `26` | 指数型 |
| `31` | 债券型 |
| `35` | 货币型 |
| `6` | QDII |
| `3` | ETF |
| `33` | 联接 |
| `15` | FOF |
| `4` | LOF |
| `50` | 商品 |
| `32` | 定开债 |
| `2949` | 理财 |

**排序字段 SortColumn**

| 值 | 说明 |
|----|------|
| `SYL_Z` | 近1周收益率 |
| `SYL_Y` | 近1月收益率 |
| `SYL_3Y` | 近3月收益率 |
| `SYL_6Y` | 近6月收益率 |
| `SYL_JN` | 今年以来收益率 |
| `SYL_1N` | 近1年收益率 |
| `SYL_2N` | 近2年收益率 |
| `SYL_3N` | 近3年收益率 |
| `SYL_5N` | 近5年收益率 |
| `SYL_LN` | 成立以来收益率 |
| `ENDNAV` | 基金规模 |
| `HLDWJZ` | 最新净值（非货币） |
| `RZDF` | 日涨跌幅 |
| `DWJZ` | 万份收益（货币/理财） |
| `LJJZ` | 7日年化（货币/理财） |

**示例** `/fundMNRank?FundType=25&SortColumn=SYL_1N&Sort=desc&pageIndex=1&pageSize=20`

```json
{
  "Datas": [{
    "FCODE": "003834",
    "SHORTNAME": "华夏能源革新股票A",
    "DWJZ": "3.114",
    "LJJZ": "3.114",
    "RZDF": "0.61",
    "SYL_1N": "43.73",
    "ENDNAV": "18434368978.8"
  }],
  "allRecords": 4521
}
```

---

## 获取基金排行（香港互认）

**路由**：`/fundMNHKRank`

返回香港互认基金排行，参数结构与 `/fundMNRank` 基本一致。

**参数**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `FundType` | string | | 默认 `0`=全部 |
| `SortColumn` | string | | 排序字段（见下表） |
| `Sort` | string | | `desc` / `asc` |
| `pageIndex` | number | | 页码 |
| `pageSize` | number | | 每页条数 |

**港股排序字段 SortColumn**

| 值 | 说明 |
|----|------|
| `NAV` | 最新净值 |
| `JZCUNIT` | 计价币种 |
| `NAVCHGRT` | 日涨跌幅 |
| `W` | 近1周收益率 |
| `M` | 近1月收益率 |
| `Q` | 近3月收益率 |
| `SY` | 今年以来 |
| `Y` | 近1年 |
| `TWY` | 近2年 |
| `TRY` | 近3年 |
| `SE` | 成立以来 |

**示例** `/fundMNHKRank?SortColumn=Y&Sort=desc&pageIndex=1&pageSize=20`

```json
{
  "Datas": [
    { "FCODE": "xxxxxx", "SHORTNAME": "某香港互认基金", "Y": "12.5" }
  ],
  "allRecords": 132
}
```

---

## 获取基金排行榜（PC版，多维排序）

**路由**：`/fundsRankHandler`

通过东方财富 PC 端排行接口获取基金排名，支持自定义排序维度。

**参数**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `sort` | string | | 排序配置 JSON 字符串，例：`{"oneYear":"descend"}` |
| `current` | number | | 页码，默认 1 |
| `pageSize` | number | | 每页条数，默认 20 |
| `gs` | string | | 基金公司代码过滤 |

**sort 可选 key**

| key | 说明 |
|-----|------|
| `dayRatio` | 日涨跌幅 |
| `oneWeek` | 近1周 |
| `oneMonth` | 近1月 |
| `threeMonth` | 近3月 |
| `sixMonth` | 近6月 |
| `oneYear` | 近1年 |
| `twoYear` | 近2年 |
| `threeYear` | 近3年 |
| `thisYear` | 今年以来 |
| `created` | 成立以来 |

value 可选：`descend`（降序）/ `ascend`（升序）

**示例** `/fundsRankHandler?sort={"oneYear":"descend"}&current=1&pageSize=20`

```json
{
  "code": 200,
  "msg": "获取成功",
  "data": {
    "datas": [{
      "code": "003834",
      "shortName": "华夏能源革新股票A",
      "date": "2022-05-25",
      "unitNav": "3.095",
      "dayRatio": "0.61",
      "oneYear": "43.73",
      "created": "84.8",
      "serviceFee": "0.15%"
    }],
    "allRecords": 10248
  }
}
```
