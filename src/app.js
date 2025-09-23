const koa = require('koa');
const Router = require('@koa/router');
const { log } = require('./utils/log');
const { getModules } = require('./utils');
const cors= require('koa2-cors');

function startServe() {
  return new Promise((resolve) => {
    const app = new koa();

    const router = new Router();

    getModules().forEach(({ fileName, path }) => {
      const routerPath = `/${fileName}`;
      const api = require(path);

      app[fileName] = api;

      log(`✅ 生成路由 ${routerPath}`);

      router.get(routerPath, async (ctx, next) => {
        ctx.status = 200;
        ctx.body = await api(ctx.request.query, ctx);
        next();
      });
    });

    app.use(router.routes()).use(router.allowedMethods()).use(cors());

    const server = app.listen(3002, () => {
      log('🚀 server is running at port 3002');
      resolve(server);
    });
  });
}

module.exports = {
  startServe,
};
