/**
 * HTTP 请求工具
 *
 * 从原 utils/index.js 中拆分出来，只负责网络请求，不再混入模块发现逻辑。
 *
 * 提供五种方法：
 *   request  - 业务 GET（自动携带 BASE_PARAMS，短超时）
 *   get      - 通用 GET（强制 IPv4，长超时，不注入 BASE_PARAMS）
 *   post     - 表单 POST（自动携带 BASE_PARAMS）
 *   xjPost   - 纯净 POST（不注入任何默认参数，适合第三方接口）
 *   jsonp    - JSONP 请求
 *   sse      - SSE 流式请求
 */

const axios = require('axios');
const http = require('http');
const https = require('https');
const logger = require('./logger')
const { BASE_HEADERS, BASE_PARAMS } = require('../config');

// ─── IPv4 强制 Agent ──────────────────────────────────────────────────────────
// 部分环境 IPv6 解析有问题，get / sse 中使用
const httpAgent = new http.Agent({ family: 4 });
const httpsAgent = new https.Agent({ family: 4 });

// ─── 工具 ─────────────────────────────────────────────────────────────────────

const mergeHeaders = (extra = {}) => ({ ...BASE_HEADERS, ...extra });

// ─── 请求方法 ─────────────────────────────────────────────────────────────────

/**
 * 轻量 GET（自动携带 BASE_PARAMS，10s 超时，适合大多数业务接口）
 *
 * @param {string} url
 * @param {object} [params={}]       额外 Query 参数（会与 BASE_PARAMS 合并）
 * @param {object} [extraHeaders={}]
 * @returns {Promise<object>}        接口返回的 data 字段；失败返回 { code: 400, error }
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
    logger.error('[request] 请求失败:', url, err.message);
    return { code: 400, error: err.message };
  }
};

/**
 * 通用 GET（强制 IPv4，300s 超时，不自动注入 BASE_PARAMS）
 * 适合耗时或需要稳定连接的场景
 *
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
    logger.error('[get] 请求失败:', url, err.message);
    return { code: 400, error: err.message };
  }
};

/**
 * 表单 POST（自动携带 BASE_PARAMS，application/x-www-form-urlencoded）
 *
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
    logger.error('[post] 请求失败:', url, err.message);
    return { code: 400, error: err.message };
  }
};

/**
 * 纯净 POST（不注入任何默认参数或请求头，适合第三方接口如小倍养基）
 *
 * @returns {Promise<any>}
 */
const xjPost = async (url, data) => {
  try {
    const res = await axios.post(url, data);
    return res.data;
  } catch (err) {
    logger.error('[xjPost] 请求失败:', url, err.message);
    return { code: 400, error: err.message };
  }
};

/**
 * JSONP 请求（将 `callbackName({...})` 解析为 JSON 对象）
 *
 * @param {string} url
 * @param {string} callback  JSONP 包裹函数名，如 "jQuery_cb"
 * @param {object} [params={}]
 */
const jsonp = async (url, callback, params = {}) => {
  const res = await axios(url, { params });
  const raw = res.data.replace(/[\r\n]/g, '');
  const json = raw.slice(callback.length + 1, raw.length - 1);
  return JSON.parse(json);
};

/**
 * SSE 流式请求（返回 axios stream，调用方通过 .on('data') 消费）
 *
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
    logger.error('[sse] 连接失败:', url, err.message);
    return err;
  }
};

module.exports = { request, get, post, xjPost, jsonp, sse };
