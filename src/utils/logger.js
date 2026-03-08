/*
 * @Author: wuhao 
 * @Date: 2026-03-07 00:16:05 
 * @Desc: 日志打印控制
 * @Last Modified by: wuhao
 * @Last Modified time: 2026-03-08 23:16:49
 */

function getBeijingTime() {
  return new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' });
}

function log(level, ...args) {
  if (process.env.NODE_ENV === 'product') {//!生产环境就不显示日志
    return;
  }
  const prefix = `[${getBeijingTime()}]`;
  if (level === 'error') {
    console.error(prefix + "🚫", ...args);
  } else if (level === 'success') {
    console.log(prefix + "✅", ...args);
  } else if (level === 'warn') {
    console.log(prefix + "⚠️", ...args);
  } else {
    console.log(prefix, ...args);
  }
}

module.exports = {
  error: (...args) => log('error', ...args),
  warn: (...args) => log('warn', ...args),
  success: (...args) => log('success', ...args),
  info: (...args) => log('info', ...args),
  debug: (...args) => log('debug', ...args),
};