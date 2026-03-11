# 快速开始

## 安装依赖

```bash
npm install
# 或
pnpm install
```

## 启动服务

### Node 中启动（开发模式）
```bash
npm run dev
```

### Node 中启动（生产模式）
```bash
npm run start
```

服务默认运行在 `http://localhost:3000`，可通过环境变量 `PORT` 修改端口：

```bash
PORT=8080 npm run start
```

### Docker 中启动

```bash
docker run -d -p 3000:3000 kouchao/tiantian_fund_api
```

## 作为 npm 包使用

### 安装
```bash
npm i tiantian-fund-api -S
```

### 使用示例

```javascript
const { fundSearch } = require('tiantian-fund-api')

async function main() {
  const res = await fundSearch({
    m: '1',
    key: '新能源'
  })
  console.log(res)
}

main()
```

## Vercel 部署

项目支持在 Vercel 中调用 API。由于 Vercel 个人版限制 12 个 API，通过 `action_name` 参数路由到不同接口：

```
https://tiantian-fund-api.vercel.app/api/action?action_name={路由名}&{请求参数}
```

例如，基金搜索接口 `/fundSearch?m=1&key=新能源` 在 Vercel 中调用：

[https://tiantian-fund-api.vercel.app/api/action?action_name=fundSearch&m=1&key=新能源](https://tiantian-fund-api.vercel.app/api/action?action_name=fundSearch&m=1&key=新能源)

## 运行测试

```bash
npm run test
```

## 目录结构

```
├── src/
│   ├── app.js              # Koa 服务入口
│   ├── config/
│   │   └── index.js        # 全局常量配置
│   ├── utils/
│   │   ├── http.js         # HTTP 请求工具
│   │   ├── loader.js       # 模块动态加载
│   │   ├── index.js        # 统一导出
│   │   └── logger.js       # 日志工具
│   ├── module/             # 59 个业务接口模块
│   └── service/
│       └── sseClient.js    # SSE 客户端
├── test/                   # 测试用例
├── docs/                   # VuePress 文档
└── index.js                # 程序入口
```
