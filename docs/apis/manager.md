# 👤 基金经理

## 获取基金的现任基金经理

**路由**：`/fundMNMangerList`

返回指定基金当前在任的所有基金经理信息。

**参数**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `FCODE` | string | ✅ | 基金代码，例：`004241` |

**示例** `/fundMNMangerList?FCODE=004241`

```json
{
  "Datas": [{
    "MGRID": "30040539,30675033",
    "MGRNAME": "周蔚文,罗佳明",
    "FCODE": "004241",
    "DAYS": "158",
    "FEMPDATE": "2021-12-17",
    "LEMPDATE": "--",
    "PENAVGROWTH": "-26.0088",
    "NEWPHOTOURL": "https://pdf.dfcfw.com/pdf/H8_30040539_1.JPG,...",
    "ISINOFFICE": "1,1"
  }]
}
```

---

## 获取基金经理详细信息

**路由**：`/fundMSNMangerInfo`

返回基金经理的个人资料、从业年限、在管规模及综合评分。

**参数**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `FCODE` | string | ✅ | 基金经理 ID（注意：参数名为 FCODE 但传经理 ID），例：`30185328` |

**示例** `/fundMSNMangerInfo?FCODE=30185328`

```json
{
  "Datas": {
    "MGRID": "30185328",
    "MGRNAME": "马君",
    "RESUME": "...",
    "TOTALDAYS": "3553",
    "NETNAV": "7802520538.55",
    "JJGS": "银华基金",
    "NEWPHOTOURL": "https://pdf.dfcfw.com/pdf/H8_30185328_1.JPG",
    "YIELDSE": "-5.6634",
    "MGOLD": "8.29",
    "SY1": "6.37",
    "SINFO1": "7.49",
    "FMAXEARN1": "1.2929",
    "FMAXRETRA1": "0.5822"
  }
}
```

---

## 获取基金经理业绩走势

**路由**：`/fundMSNMangerAcc`

返回经理历史管理期间的累计收益走势，支持与沪深300等基准对比。

**参数**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `mGRID` | string | ✅ | 基金经理 ID |
| `rANGE` | string | | 范围：`n`=年（`3n`=3年）`y`=月（`3y`=3月）`ln`=任职起 |

**示例** `/fundMSNMangerAcc?mGRID=30185328&rANGE=3n`

```json
{
  "Datas": [{
    "PDATE": "2021-12-02",
    "SYI": "-0.11",
    "AVGSYI": "0.01",
    "INDEXSYI": "-0.08"
  }]
}
```

---

## 获取基金经理业绩排行

**路由**：`/fundMSNMangerPerRank`

返回经理在管代表基金在同类中各阶段的排名情况。

**参数**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `mGRID` | string | ✅ | 基金经理 ID |

**示例** `/fundMSNMangerPerRank?mGRID=30185328`

```json
{
  "Datas": {
    "W": "-1.81", "WRANK": "143", "WSC": "237",
    "M": "8.31",  "MRANK": "26",  "MSC": "238",
    "Q": "-13.22","QRANK": "155", "QSC": "235",
    "Y": "-18.43","YRANK": "115", "YSC": "201",
    "I_W": "-1.72", "I_M": "5.21", "I_Y": "-17.38"
  }
}
```

---

## 获取基金经理业绩评价

**路由**：`/fundMSNMangerPerEval`

多维度能力量化评分，含夏普比率、最大回撤、波动率、超额胜率。

**参数**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `mGRID` | string | ✅ | 基金经理 ID |

**示例** `/fundMSNMangerPerEval?mGRID=30185328`

```json
{
  "Datas": {
    "MAXRETRA_1": "0.2757",
    "SHARP_1": "1.0413",
    "SHARP_3": "0.4298",
    "STDDEV_1": "23.8601",
    "WIN_1": "45.28",
    "WIN_3": "56.57"
  }
}
```

---

## 获取基金经理投资风格

**路由**：`/fundMSNMangerPosMark`

返回经理十大重仓股、持仓风格（大/中/小盘 + 价值/平衡/成长）及重仓行业分布。

**参数**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `mGRID` | string | ✅ | 基金经理 ID |

**示例** `/fundMSNMangerPosMark?mGRID=30185328`

```json
{
  "Datas": {
    "Pos": [{
      "GPDM": "600104",
      "GPJC": "上汽集团",
      "JZBL": "16.73",
      "INDEXNAME": "汽车"
    }],
    "PosDate": "2022-03-31",
    "Style": {
      "FSCALE": "01",
      "FSTYLE": "01",
      "GZQK": "3",
      "YLQK": "1"
    },
    "SubStyle": [
      { "DLMC": "科技", "CCBL": "11.59", "AVRBL": "11.63" }
    ]
  }
}
```

**Style 字段说明**

| 字段 | 值 | 含义 |
|------|----|------|
| `FSCALE` | `01` `02` `03` | 大盘 / 中盘 / 小盘 |
| `FSTYLE` | `01` `02` `03` | 价值 / 平衡 / 成长 |
| `GZQK` | `1` `2` `3` | 估值低 / 中 / 高 |
| `YLQK` | `1` `2` `3` | 盈利低 / 中 / 高 |

---

## 获取基金经理持仓特征

**路由**：`/fundMSNMangerPosChar`

返回持仓集中度、股票仓位、行业集中度等特征分析，含同类平均对比。

**参数**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `mGRID` | string | ✅ | 基金经理 ID |

**示例** `/fundMSNMangerPosChar?mGRID=30185328`

```json
{
  "Datas": {
    "GPCW": 99.02,
    "GPCWAVG": 77.02,
    "SDJZD": 37.61,
    "SDJZDAVG": 32.92,
    "DYHYZB": 17.06,
    "HYJZD": 15.18,
    "YCESL_3M": 50.0
  }
}
```

---

## 获取基金经理历史管理基金

**路由**：`/fundMSNMangerProContr`

返回经理曾经管理的所有基金（含已离任），含任职起止日期和任职期间收益率。

**参数**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `mGRID` | string | ✅ | 基金经理 ID |

**示例** `/fundMSNMangerProContr?mGRID=30185328`

```json
{
  "Datas": [{
    "FCODE": "502056",
    "SHORTNAME": "广发中证医疗指数(LOF)A",
    "FEMPDATE": "2015-10-12",
    "LEMPDATE": "--",
    "PENAVGROWTH": "12.44",
    "TLRANK": "370",
    "TLSC": "495",
    "FTYPE": "指数型-股票"
  }]
}
```

---

## 获取经理在管/曾管基金列表

**路由**：`/getManagerFundsList`

根据 `manageType` 区分返回"当前在管"或"历史曾管"的基金列表，支持多维度排序。

**参数**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `MGRID` | string | ✅ | 基金经理 ID |
| `manageType` | number | ✅ | `1`=当前在管  `2`=历史曾管 |
| `sortColumn` | string | | 排序字段，例：`SYL_1N` `ENDNAV` |
| `sort` | string | | 排序方向：`descend`（默认）/ `ascend` |

**示例** `/getManagerFundsList?MGRID=30185328&manageType=1&sortColumn=SYL_1N`

```json
{
  "code": 200,
  "data": [{
    "FCODE": "005237",
    "SHORTNAME": "银华医疗健康量化优选A",
    "STARTDATE": "2019-09-10",
    "ENDDATE": "--",
    "DWJZ": "1.85",
    "SYL_1N": "18.43"
  }]
}
```
