// app.js
const Koa = require('koa');
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
      log('🚀 server is running at port 3002');
      resolve(server);
    });
  });
}

module.exports = { startServe };
