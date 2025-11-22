const koa = require('koa');
const Router = require('@koa/router');
const { log } = require('./utils/log');
const { getModules } = require('./utils');
const cors = require('koa2-cors');
const k2c = require('koa2-connect');
const { createProxyMiddleware } = require("http-proxy-middleware");
function startServe() {
  return new Promise((resolve) => {
    const app = new koa();

    const router = new Router();

    getModules().forEach(({ fileName, path }) => {
      const routerPath = `/${fileName}`;
      const api = require(path);
      app[fileName] = api;
      // app['proxy/' + fileName] = api;

      log(`✅ 生成路由 ${routerPath}`);
      router.get(routerPath, async (ctx, next) => {
        ctx.status = 200;
        ctx.body = await api(ctx.request.query, ctx);
        next();
      });
    });

    // 创建一个代理中间件
    const proxyMiddleware = createProxyMiddleware({
      target: 'https://push2.eastmoney.com', // 要代理的目标服务器地址
      changeOrigin: true,           // 是否改变源地址（通常需要设置为 true）
      pathRewrite: { '^/proxy': '' }  // 重写请求路径
    });
    app.use(async (ctx, next) => {
      if (ctx.url.startsWith('/proxy')) {
        ctx.respond = false;
        await k2c(proxyMiddleware)(ctx, next);
      }
      await next();
    });
    // 使用代理中间件
    app.use(router.routes()).use(router.allowedMethods()).use(cors());
    // app.use(router.routes()).use(router.allowedMethods()).use(cors({
    //   origin: (ctx) => {
    //     // 动态匹配允许的域名
    //     const allowedOrigins = [
    //       'https://www.haohome.top',
    //       'http://localhost:8000'
    //     ];
    //     const origin = ctx.request.header.origin;
    //     return allowedOrigins.includes(origin) ? origin : false;
    //   },
    //   allowMethods: ['GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS'],
    //   // 下面这条加上才能共享跨域session，同时前端ajax请求也要加上响应的参数
    //   credentials: true,
    // }));

    const server = app.listen(3002, () => {
      log('🚀 server is running at port 3002');
      resolve(server);
    });
  });
}

module.exports = {
  startServe,
};
