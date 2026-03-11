/**
 * utils/index.js
 *
 * 向后兼容的统一导出入口。
 * 所有 module 文件之前从这里 require http 工具，现在仍然可以正常工作，
 * 同时内部已拆分为 http.js（网络请求）和 loader.js（模块发现）。
 */

const { request, get, post, xjPost, jsonp, sse } = require('./http');
const { getModules } = require('./loader');

module.exports = { request, get, post, xjPost, jsonp, sse, getModules };
