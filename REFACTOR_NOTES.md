# 重构说明

## 问题汇总 & 修复

### 🔴 严重问题

#### 1. `fundsRankHandler.js` — `eval()` 安全漏洞
**问题：** 对远端接口返回的字符串直接执行 `eval(res.data)`，若接口数据被篡改或请求被中间人劫持，攻击者可任意执行代码。

**修复：** 改用正则提取 `var rankData={...}` 后进行 `JSON.parse()`，完全消除 eval 风险。

---

#### 2. `src/service/eastmoney.js` — 自执行 IIFE，`require` 即触发
**问题：** 整个文件是一个立即执行的异步函数，一旦被 `require`，就会立即向东方财富建立 SSE 连接并打印日志，无法作为可复用模块使用。

**修复：** 重写为 `src/service/sseClient.js`，导出 `createSseClient(url, options)` 工厂函数，调用方按需使用，无副作用。

---

### 🟠 逻辑 Bug

#### 3. 测试端口与服务端口不一致
**问题：** `src/app.js` 硬编码 `app.listen(3002)`，而所有测试文件使用 `localhost:3000`，所有测试都无法通过。

**修复：**
- `app.js` 改为读取 `process.env.PORT || 3000`
- 测试文件同步改为 `process.env.PORT || 3000`

---

#### 4. `FundVPageAccV2.js` — RANGE 参数写死成字段名本身
**问题：** `_params.RANGE = 'RANGE'`，字段值等于字段名，这是复制粘贴 bug，实际应传日期范围如 `'1Y'`、`'3Y'`、`'MAX'`。

**修复：** 改为 `RANGE: params.range || ''`，由调用方传入。

---

### 🟡 代码质量

#### 5. `src/utils/index.js` — 职责混乱
**问题：** HTTP 请求工具、公共常量、模块发现逻辑全部堆在一个 280 行文件里。

**修复：** 拆分为三个职责单一的文件：
```
src/
  config/index.js      # 常量：BASE_HEADERS, BASE_PARAMS, PORT, DEVICE_ID...
  utils/http.js        # HTTP 方法：request / get / post / xjPost / jsonp / sse
  utils/loader.js      # 模块发现：getModules()
  utils/index.js       # 向后兼容的统一导出（原有 require 路径无需修改）
```

---

#### 6. `utils/loader.js` (原 getModules) — 相对路径依赖启动目录
**问题：** 原版使用 `glob.sync('./src/module/*.js')`，必须从项目根目录执行 `node` 才能找到文件，换个目录启动就会失败。

**修复：** 改用 `path.resolve(__dirname, '../module')` 构建绝对路径，与启动目录无关。

---

#### 7. `conditionListForRank.js` — 无用的 `dayjs` 导入
**问题：** `const dayjs = require('dayjs')` 引入后从未使用，造成误导。

**修复：** 移除该导入。

---

#### 8. `marketIndex.js` — 混用原生 fetch + 重复 header 键
**问题：**
- 混用了原生 `fetch` 和项目自己的 `get()` 工具（被注释掉），存在注释代码污染
- `headers` 对象中 `Accept-Encoding` 声明了两次

**修复：** 统一改用项目的 `get()`，移除重复 header。

---

#### 9. `getStockRatio.js` — 混用原生 fetch 与 axios
**问题：** 第一步用项目 `request()`，第二步用原生 `fetch()`，两种风格混用，错误处理逻辑不统一。

**修复：** 统一改用项目 `get()`，错误处理统一。

---

#### 10. `FundStockMonth.js` — validmark 签名中有空格
**问题：** `validmark` 请求头的值中间含有空格（`...X + n09...`），这是被截断的签名，会导致服务端验签失败。

**修复：** 改从 `config/index.js` 统一读取 `MINIAPP_HEADERS`，使用项目维护的正确签名。

---

#### 11. `src/app.js` — 缺少全局错误中间件和请求日志
**问题：** module 内部的未捕获异常会直接崩溃路由，返回空响应，客户端无法得到有效错误信息。

**修复：** 在最顶层添加错误捕获中间件和请求日志中间件。

## 文件结构对比

```
src/
├── app.js                  ✏️  修复：添加错误中间件、日志、端口配置化
├── index.js                ✅  不变
├── config/
│   └── index.js            🆕  集中管理所有常量
├── utils/
│   ├── http.js             🆕  HTTP 请求方法（从 utils/index.js 拆出）
│   ├── loader.js           🆕  模块发现（从 utils/index.js 拆出，修复路径问题）
│   ├── index.js            ✏️  向后兼容的统一导出
│   └── logger.js           ✅  不变
├── module/
│   ├── fundsRankHandler.js ✏️  移除 eval()
│   ├── FundVPageAccV2.js   ✏️  修复 RANGE bug
│   ├── FundStockMonth.js   ✏️  修复 validmark 签名
│   ├── conditionListForRank.js ✏️ 移除无用 dayjs 导入
│   ├── marketIndex.js      ✏️  统一使用 get()，修复重复 header
│   ├── getStockRatio.js    ✏️  统一使用 get()，移除原生 fetch
│   └── ...（其余 49 个保持不变）
├── service/
│   └── sseClient.js        🆕  原 eastmoney.js 的正确实现（工厂函数）
└── test/
    └── *.spec.js           ✏️  修复端口硬编码
```
