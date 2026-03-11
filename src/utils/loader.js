/**
 * 模块动态加载
 * 扫描 src/module/ 目录，返回所有 .js 模块的元信息
 *
 * 从原 utils/index.js 中拆分出来，修复了原版使用相对路径
 * `./src/module/*.js` 的问题（必须从项目根运行 node 才能工作）。
 * 现在改用 __dirname 构建绝对路径，无论从哪里启动都可靠。
 */

const path = require('path');
const glob = require('glob');

/**
 * @returns {{ fileName: string, path: string }[]}
 */
const getModules = () => {
  const moduleDir = path.resolve(__dirname, '../module');
  // 使用绝对路径，兼容任意工作目录和 Windows 路径分隔符
  const files = glob.sync(`${moduleDir}/*.js`).map(f => f.replaceAll('\\', '/'));

  return files.map((filePath) => {
    const fileName = path.basename(filePath, '.js');
    return { fileName, path: filePath };
  });
};

module.exports = { getModules };
