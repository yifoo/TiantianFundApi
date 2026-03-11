// app.js
const Koa = require('koa');
const Router = require('@koa/router');
const cors = require('koa2-cors');
const logger = require('./utils/logger');
const { getModules } = require('./utils');
const { PORT } = require('./config');

function startServe() {
  return new Promise((resolve) => {
    const app = new Koa();
    const router = new Router();

    // ── 1. 全局错误处理（必须最前，捕获所有下游中间件的异常）──────────────
    app.use(async (ctx, next) => {
      try {
        await next();
      } catch (err) {
        ctx.status = err.status || 500;
        ctx.body = {
          code: ctx.status,
          msg: err.message || '服务器内部错误',
          data: null,
        };
        logger.error(`[${ctx.method}] ${ctx.url} →`, err.message);
      }
    });

    // ── 2. CORS ──────────────────────────────────────────────────────────────
    app.use(
      cors({
        origin: '*',
        allowMethods: ['GET', 'POST', 'OPTIONS'],
        allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
        credentials: false,
      })
    );

    // ── 3. 请求日志 ──────────────────────────────────────────────────────────
    app.use(async (ctx, next) => {
      const start = Date.now();
      await next();
      logger.info(`[${ctx.method}] ${ctx.url} ${ctx.status} ${Date.now() - start}ms`);
    });

    // ── 4. 动态业务路由（扫描 src/module/*.js，以文件名作为路由路径）────────
    const modules = getModules();
    modules.forEach(({ fileName, path }) => {
      const routePath = `/${fileName}`;
      const handler = require(path);
      app[fileName] = handler; // 挂在 app 上，方便测试直接调用
      logger.success(`注册路由 GET ${routePath}`);

      router.get(routePath, async (ctx) => {
        ctx.status = 200;
        ctx.body = await handler(ctx.request.query, ctx);
      });
    });

    // ── 5. 挂载路由 ──────────────────────────────────────────────────────────
    app.use(router.routes()).use(router.allowedMethods());

    // ── 6. 启动 ──────────────────────────────────────────────────────────────
    const server = app.listen(PORT, () => {
      logger.success(`🚀 server is running at http://localhost:${PORT}`);
      resolve(server);
    });
  });
}

module.exports = { startServe };
