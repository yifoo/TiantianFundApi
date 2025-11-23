// sseClient.js   <-- 直接放进你的项目
// ---------------------------------------------------
// 1️⃣ 统一获取 EventSource 构造函数（兼容所有导出方式）
let EventSource; // 最终要得到的构造函数

(async () => {
  try {
    // ① 先尝试 ESM 动态 import（Node >=12）
    const mod = await import('eventsource');
    // ② 按顺序挑选真正的构造函数
    EventSource =
      // 命名导出直接在根对象上
      mod.EventSource ||
      // default 可能是类本身
      mod.default ||
      // default 可能是一个命名空间对象，内部再找 EventSource
      (mod.default && mod.default.EventSource);
  } catch (_) {
    // ③ 若 import 失败（比如在老版 Node），回退到传统 require
    const mod = require('eventsource');
    EventSource =
      mod.EventSource ||
      mod.default ||
      (mod.default && mod.default.EventSource);
  }

  // 4️⃣ 检查是否真的拿到了构造函数
  if (typeof EventSource !== 'function') {
    console.error('❌ EventSource 导入失败，得到的不是构造函数');
    console.error('返回值:', EventSource);
    process.exit(1); // 直接退出，防止后面继续报错
  }

  // ---------------------------------------------------
  // 5️⃣ 正式使用（保持你原来的 Keep‑Alive、Header 配置）
  const https = require('https');
  const httpsAgent = new https.Agent({
    keepAlive: true,
    timeout: 20000,
    keepAliveMsecs: 1000,
    rejectUnauthorized: true,
  });

  const baseHeaders = {
    'User-Agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/130.0.0.0 Safari/537.36',
    Accept: '*/*',
    'Accept-Encoding': 'gzip, deflate, br',
    Connection: 'keep-alive',
    Referer: 'https://quote.eastmoney.com/',
  };

  // 示例 URL（请自行替换为你实际需要的路径和参数）
  const url = new URL(
    'https://push2.eastmoney.com/api/qt/ulist/sse?secids=1.000001&fields=f1,f2,f3',
  );

  // 6️⃣ 创建 EventSource 实例
  const es = new EventSource(url.toString(), {
    https: { agent: httpsAgent },
    headers: baseHeaders,
  });

  // 7️⃣ 事件处理
  es.onopen = () => console.log('✅ SSE 已连接');
  es.onerror = (e) => console.error('❌ SSE 错误', e);
  es.onmessage = (ev) => {
    console.log('📨 收到 data:', ev.data);
    // 只要第一条就关闭，防止一直占用连接
    es.close();
  };

  // 8️⃣ 超时保护（20 秒未收到 data 则强制关闭）
  setTimeout(() => {
    if (es.readyState !== es.CLOSED) {
      console.warn('⏱️ 超时未收到 data，强制关闭');
      es.close();
    }
  }, 20000);
})();
