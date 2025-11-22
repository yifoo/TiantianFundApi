const koa = require('koa');
const http = require('http');
const https = require('https');
const Router = require('@koa/router');
const { log } = require('./utils/log');
const { getModules } = require('./utils');
const cors = require('koa2-cors');
const k2c = require('koa2-connect');
const axios = require('axios')
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
      pathRewrite: { '^/proxy': '' },  // 重写请求路径
      timeout: 5000,
      logs: true,
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36',
        'Accept': '*/*',
        'Accept-Encoding': 'gzip, deflate, br'
      },
      // ④ 使用自定义 http/https Agent，保持连接并设定超时
      httpAgent: new http.Agent({ keepAlive: true, timeout: 15000 }),
      httpsAgent: new https.Agent({ keepAlive: true, timeout: 15000 })
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

    // app.use(async (ctx, next) => {
    //   try {
    //     await next(); // 执行下一个中间件（这里是代理）
    //   } catch (err) {
    //     ctx.status = err.status || 500; // 设置状态码
    //     ctx.body = err.message; // 设置响应体内容
    //     console.log('err.message: ', err.message);
    //     ctx.app.emit('error', err, ctx); // 触发错误事件，可以在 app.js 中监听此事件来记录日志等操作。
    //   }
    // });
    // ⑤ 全局错误捕获
    app.on('error', (err, ctx) => {
      // 常见的 socket hang up 多是超时或目标服务器主动关闭
      if (err.code === 'ECONNRESET' || err.message.includes('socket hang up')) {
        console.warn('⚠️ 代理请求被目标服务器中断，已记录')
      } else {
        console.error('❌ Koa error:', err)
      }
    })

    // ⑥ 为了进一步降低 socket hang up，使用 axios 进行二次请求示例（可选）
    app.use(async (ctx, next) => {
      if (ctx.path.startsWith('/proxy')) {
        try {
          const targetUrl = 'https://push2.eastmoney.com' + ctx.path.replace('/proxy', '')
          const resp = await axios({
            method: ctx.method,
            url: targetUrl,
            params: ctx.query,
            data: ctx.request.body,
            headers: ctx.headers,
            timeout: 12000,               // 与上面的 Agent 超时保持一致
            responseType: 'arraybuffer'   // 保留 gzip/deflate 原始二进制
          })
          ctx.set(resp.headers)          // 把目标返回的头部原样转发
          ctx.body = resp.data
        } catch (e) {
          ctx.status = e.response?.status || 502
          ctx.body = { error: '代理失败', detail: e.message }
        }
      } else {
        await next()
      }
    })
    const server = app.listen(3002, () => {
      log('🚀 server is running at port 3002');
      resolve(server);
    });
  });
}

module.exports = {
  startServe,
};
