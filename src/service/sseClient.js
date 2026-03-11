/**
 * SSE 客户端封装（EventSource）
 *
 * 重构说明：
 *   原 src/service/eastmoney.js 是一个自执行 IIFE，被 require 时会
 *   立即建立 SSE 连接并打印日志，完全无法作为可复用模块使用。
 *
 *   现在改为导出 createSseClient(url, options) 工厂函数，
 *   调用方按需创建连接，不使用时不产生任何副作用。
 */

const https = require('https');

const httpsAgent = new https.Agent({
  keepAlive: true,
  keepAliveMsecs: 1000,
  timeout: 20_000,
  rejectUnauthorized: true,
});

const BASE_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/130.0.0.0 Safari/537.36',
  Accept: '*/*',
  'Accept-Encoding': 'gzip, deflate, br',
  Connection: 'keep-alive',
  Referer: 'https://quote.eastmoney.com/',
};

/**
 * 创建一个 EventSource SSE 连接
 *
 * @param {string} url              - 目标 SSE 地址
 * @param {object} [options={}]
 * @param {object} [options.headers]  - 额外请求头（会与 BASE_HEADERS 合并）
 * @param {number} [options.timeout]  - 超时毫秒数，默认 20000
 * @returns {Promise<EventSource>}    resolve 时连接已建立
 */
async function createSseClient(url, options = {}) {
  // 动态导入，兼容 ESM 和 CJS 两种导出格式
  let EventSourceCtor;
  try {
    const mod = await import('eventsource');
    EventSourceCtor = mod.EventSource ?? mod.default?.EventSource ?? mod.default;
  } catch {
    const mod = require('eventsource');
    EventSourceCtor = mod.EventSource ?? mod.default?.EventSource ?? mod.default;
  }

  if (typeof EventSourceCtor !== 'function') {
    throw new Error('EventSource 导入失败，请确认已安装 eventsource 依赖');
  }

  const mergedHeaders = { ...BASE_HEADERS, ...(options.headers || {}) };
  const timeoutMs = options.timeout ?? 20_000;

  return new Promise((resolve, reject) => {
    const es = new EventSourceCtor(url, {
      https: { agent: httpsAgent },
      headers: mergedHeaders,
    });

    const timer = setTimeout(() => {
      if (es.readyState !== es.CLOSED) {
        es.close();
        reject(new Error(`SSE 连接超时（${timeoutMs}ms）: ${url}`));
      }
    }, timeoutMs);

    es.onopen = () => {
      clearTimeout(timer);
      resolve(es);
    };

    es.onerror = (e) => {
      clearTimeout(timer);
      es.close();
      reject(e);
    };
  });
}

module.exports = { createSseClient };
