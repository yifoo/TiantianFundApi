// app.js
const Koa = require('koa');
const http = require('http');
const https = require('https');
const Router = require('@koa/router');
const { log } = require('./utils/log');
const { getModules } = require('./utils');
const cors = require('koa2-cors');

// ---------- 1️⃣ 统一获取 EventSource ----------
let EventSource;
(async () => {
  try {
    const mod = await import('eventsource');
    EventSource =
      mod.EventSource || mod.default || (mod.default && mod.default.EventSource);
  } catch (_) {
    const mod = require('eventsource');
    EventSource =
      mod.EventSource || mod.default || (mod.default && mod.default.EventSource);
  }
  if (typeof EventSource !== 'function') {
    console.error('❌ EventSource 导入失败');
    process.exit(1);
  }
})();

function startServe() {
  return new Promise((resolve) => {
    const app = new Koa();
    const router = new Router();

    // ---------- 2️⃣ CORS（必须最前） ----------
    app.use(
      cors({
        origin: '*', // 如需限制请改成前端域名
        allowMethods: ['GET', 'POST', 'OPTIONS'],
        allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
        credentials: false,
      })
    );

    // ---------- 3️⃣ **先注册 SSE 路由** ----------
    router.get('/sse', async (ctx) => {
      // 等待 EventSource 类加载完成
      while (typeof EventSource !== 'function') {
        await new Promise((r) => setTimeout(r, 30));
      }

      // 关闭 Koa 自动响应，让我们手动写入 SSE
      ctx.respond = false;
      ctx.set({
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
        'X-Accel-Buffering': 'no',
      });
      let query = ctx.query
      // 目标 SSE 地址（可改为 query 参数）
      const targetUrl =
        `https://push2.eastmoney.com/api/qt/ulist/sse?secids=${query.secids}&fields=${query.fields}&pn=1&ut=94dd9fba6f4581ffc558a7b1a7c2b8a3&pz=30&dpt=jj.hqpush&fltt=2`;

      // HTTPS keep‑alive Agent
      const httpsAgent = new https.Agent({
        keepAlive: true,
        timeout: 20000,
        keepAliveMsecs: 1000,
        rejectUnauthorized: true,
      });
      const httpAgent = new http.Agent({
        keepAlive: true,
        timeout: 20000,
        keepAliveMsecs: 1000,
        rejectUnauthorized: true,
      });

      // 伪装 Header
      const baseHeaders = {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/130.0.0.0 Safari/537.36',
        Accept: '*/*',
        'Accept-Encoding': 'gzip, deflate, br',
        Connection: 'keep-alive',
        Referer: 'https://quote.eastmoney.com/',
      };

      // 创建内部 EventSource（真正向目标站点拉流）
      const es = new EventSource(targetUrl, {
        https: { agent: httpsAgent },
        http: { agent: httpAgent },
        headers: baseHeaders,
      });

      // 心跳防超时（每 15 秒发送一次注释行）
      const heartbeat = setInterval(() => {
        ctx.res.write(':heartbeat\n\n');
      }, 15000);

      es.onopen = () => {
        console.log('✅ SSE 代理已连上目标站点');
        ctx.res.write(':connected\n\n');
      };

      es.onerror = (err) => {
        console.error('❌ SSE 代理错误', err);
        ctx.res.write(
          `event:error\ndata:${JSON.stringify({ msg: 'upstream error' })}\n\n`
        );
        cleanup();
      };

      es.onmessage = (ev) => {
        ctx.res.write(`data:${ev.data}\n\n`);
      };

      // 客户端关闭时清理
      ctx.req.on('close', () => {
        console.log('🔌 客户端关闭 SSE 连接');
        cleanup();
      });

      function cleanup() {
        clearInterval(heartbeat);
        es.close();
        if (!ctx.res.writableEnded) ctx.res.end();
      }
    });

    log('✅ 已注册 SSE 代理路由 /sse');

    // ---------- 4️⃣ 动态业务路由 ----------
    const modules = getModules();
    modules.forEach(({ fileName, path }) => {
      const routerPath = `/${fileName}`;
      const api = require(path);
      app[fileName] = api;
      log(`✅ 生成业务路由 ${routerPath}`);
      router.get(routerPath, async (ctx) => {
        ctx.status = 200;
        ctx.body = await api(ctx.request.query, ctx);
      });
    });

    // ---------- 5️⃣ 挂载路由 ----------
    app.use(router.routes()).use(router.allowedMethods());

    // ---------- 6️⃣ 启动服务器 ----------
    const server = app.listen(3002, () => {
      log('🚀 server is running at http://localhost:3002');
      resolve(server);
    });
  });
}

module.exports = { startServe };
