const { findSync } = require("../lib");
const Config = require("webpack-chain");
const config = new Config();
const files = findSync("config");
const path = require("path");
const resolve = p => path.join(process.cwd(), p);

module.exports = () => {
  const map = new Map();
  files.map(_ => {
    // path.basename() 方法返回 path 的最后一部分，类似于 Unix 的 basename 命令
    const name = path.basename(_, ".js");
    return map.set(name, require(_)(config, resolve));
  });
  map.forEach((v, key) => {
    // css 配置
    if (key === "css") {
      v("css", /\.css$/);
    } else {
      v();
    }
  });
  return config;
};
