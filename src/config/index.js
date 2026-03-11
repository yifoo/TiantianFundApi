/**
 * 全局配置
 * 将原本散落在 utils/index.js 和各 module 文件中的常量统一管理
 */

// ─── 服务配置 ─────────────────────────────────────────────────────────────────

const PORT = parseInt(process.env.PORT) || 3002;
const NODE_ENV = process.env.NODE_ENV || 'dev';

// ─── App 身份标识 ─────────────────────────────────────────────────────────────

const DEVICE_ID = '874C427C-7C24-4980-A835-66FD40B67605';
const APP_VERSION = '6.8.5';

/**
 * 每个 EFund 请求都需要携带的 App 标识参数
 * 原来散落在多个 module 文件里各自写一遍，现在统一从这里取
 */
const BASE_PARAMS = {
  product: 'EFund',
  deviceid: DEVICE_ID,
  MobileKey: DEVICE_ID,
  plat: 'Iphone',
  PhoneType: 'IOS15.1.0',
  OSVersion: '15.5',
  version: APP_VERSION,
  ServerVersion: APP_VERSION,
  Version: APP_VERSION,
  appVersion: APP_VERSION,
};

// ─── 请求头 ──────────────────────────────────────────────────────────────────

/** 模拟 Chrome 浏览器的通用请求头 */
const BASE_HEADERS = {
  validmark:
    'aKVEnBbJF9Nip2Wjf4de/fSvA8W3X3iB4L6vT0Y5cxvZbEfEm17udZKUD2qy37dLRY3bzzHLDv+up/Yn3OTo5Q==',
  Accept: '*/*',
  'Accept-Encoding': 'gzip, deflate, br, zstd',
  'Accept-Language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
  Connection: 'keep-alive',
  DNT: '1',
  'Sec-Fetch-Dest': 'script',
  'User-Agent':
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36',
  'sec-ch-ua': '"Chromium";v="142", "Google Chrome";v="142", "Not_A Brand";v="99"',
  'sec-ch-ua-mobile': '?0',
  'sec-ch-ua-platform': 'macOS',
};

/**
 * 部分接口（如 fundcomapi / condition）使用的小程序专用头
 * 原来每个 module 里各自手写，现在统一从这里取并按需覆盖
 */
const MINIAPP_HEADERS = {
  ...BASE_HEADERS,
  clientInfo: 'ttjj-iPad Pro 3 (12.9-inch)-iOS-iPadOS17.7',
  'MP-VERSION': '2.8.5',
  'User-Agent': 'EMProjJijin/6.8.5 (iPad; iOS 17.7; Scale/2.00)',
};

module.exports = { PORT, NODE_ENV, DEVICE_ID, APP_VERSION, BASE_PARAMS, BASE_HEADERS, MINIAPP_HEADERS };
