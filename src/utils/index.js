const axios = require('axios');
const glob = require('glob');
const http = require('http');
const https = require('https');

// ─── 网络配置 ────────────────────────────────────────────────────────────────

/**
 * 强制使用 IPv4，避免在部分环境中因 IPv6 解析失败导致请求报错
 */
const httpAgent = new http.Agent({ family: 4 });
const httpsAgent = new https.Agent({ family: 4 });

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

// ─── App 基础参数 ─────────────────────────────────────────────────────────────

const DEVICE_ID = '874C427C-7C24-4980-A835-66FD40B67605';
const APP_VERSION = '6.8.5';

/** 每个请求都会携带的 App 标识参数 */
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

// ─── 工具函数 ─────────────────────────────────────────────────────────────────

/**
 * 合并自定义请求头与基础请求头
 * @param {object} [extra={}] - 需要追加或覆盖的额外请求头
 */
const mergeHeaders = (extra = {}) => ({ ...BASE_HEADERS, ...extra });

// ─── HTTP 方法封装 ────────────────────────────────────────────────────────────

/**
 * 轻量 GET 请求（自动携带 BASE_PARAMS，短超时，不强制 IPv4）
 * 适用于业务接口（如行情、基金数据等）
 *
 * @param {string} url
 * @param {object} [params={}]  - 额外的 Query 参数
 * @param {object} [extraHeaders={}]
 * @returns {Promise<object>} 接口返回的 data 字段，失败时返回 { code: 400, error }
 */
const request = async (url, params = {}, extraHeaders = {}) => {
  try {
    const res = await axios.get(url, {
      headers: mergeHeaders(extraHeaders),
      params: { ...BASE_PARAMS, ...params },
      timeout: 10_000,
    });
    return res.data;
  } catch (err) {
    console.error('[request] 请求失败:', url, err.message);
    return { code: 400, error: err };
  }
};

/**
 * 通用 GET 请求（强制 IPv4，长超时，不自动携带 BASE_PARAMS）
 * 适用于需要稳定连接或耗时较长的请求（如下载、轮询等）
 *
 * @param {string} url
 * @param {object} [params={}]
 * @param {object} [extraHeaders={}]
 * @returns {Promise<{ code: number, data?: any, error?: string }>}
 */
const get = async (url, params = {}, extraHeaders = {}) => {
  try {
    const res = await axios.get(url, {
      headers: mergeHeaders(extraHeaders),
      params,
      httpAgent,
      httpsAgent,
      timeout: 300_000,
    });
    return { code: res.status, data: res.data };
  } catch (err) {
    console.error('[get] 请求失败:', url, err.message);
    return { code: 400, error: 'AxiosError' };
  }
};

/**
 * POST 请求（自动携带 BASE_PARAMS，以 application/x-www-form-urlencoded 格式发送）
 *
 * @param {string} url
 * @param {object} [data={}]
 * @param {object} [extraHeaders={}]
 * @returns {Promise<any>} 接口返回的 data 字段
 */
const post = async (url, data = {}, extraHeaders = {}) => {
  try {
    const res = await axios.post(
      url,
      new URLSearchParams({ ...BASE_PARAMS, ...data }),
      { headers: mergeHeaders(extraHeaders) }
    );
    return res.data;
  } catch (err) {
    console.error('[post] 请求失败:', url, err.message);
    return { code: 400, error: err };
  }
};

/**
 * 纯净 POST 请求（不附加任何默认参数或请求头）
 * 适用于第三方接口或格式有严格要求的场景
 *
 * @param {string} url
 * @param {any} data - 直接透传给 axios 的请求体
 * @returns {Promise<any>}
 */
const xjPost = async (url, data) => {
  try {
    const res = await axios.post(url, data);
    return res.data;
  } catch (err) {
    console.error('[xjPost] 请求失败:', url, err.message);
    return { code: 400, error: err };
  }
};

/**
 * JSONP 请求
 * 将响应中形如 `callbackName({...})` 的字符串解析为 JSON 对象
 *
 * @param {string} url
 * @param {string} callback - JSONP 包裹函数名，如 "jQuery_cb"
 * @param {object} [params={}]
 * @returns {Promise<object>}
 */
const jsonp = async (url, callback, params = {}) => {
  const res = await axios(url, { params });
  // 去除换行符，截取括号内的 JSON 字符串再解析
  const raw = res.data.replace(/[\r\n]/g, '');
  const json = raw.slice(callback.length + 1, raw.length - 1);
  return JSON.parse(json);
};

/**
 * SSE（Server-Sent Events）流式请求
 * 返回 axios 的 stream 对象，调用方可通过 .on('data') 监听推流数据
 *
 * @param {string} url
 * @param {object} [params={}]
 * @param {object} [extraHeaders={}]
 * @returns {Promise<Stream|Error>}
 */
const sse = async (url, params = {}, extraHeaders = {}) => {
  try {
    const res = await axios(url, {
      headers: mergeHeaders(extraHeaders),
      params: { ...BASE_PARAMS, ...params },
      responseType: 'stream',
      httpAgent,
      httpsAgent,
    });
    return res.data;
  } catch (err) {
    console.error('[sse] 连接失败:', url, err.message);
    return err;
  }
};

// ─── 模块发现 ─────────────────────────────────────────────────────────────────

/**
 * 扫描 src/module/ 目录，返回所有 .js 模块的元信息
 * 统一将路径中的反斜杠转换为正斜杠，兼容 Windows 环境
 *
 * @returns {{ fileName: string, path: string }[]}
 */
const getModules = () => {
  const files = glob.sync('./src/module/*.js');
  return files.map((filePath) => {
    const fileName = filePath.replaceAll('\\', '/').replace('src/module/', '').replace('.js', '');
    return {
      fileName,
      path: filePath.replace('src', './'),
    };
  });
};

// ─── 导出 ─────────────────────────────────────────────────────────────────────

module.exports = {
  request,
  get,
  post,
  xjPost,
  jsonp,
  sse,
  getModules,
};