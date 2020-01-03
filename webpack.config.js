const path = require("path");
const rimraf = require("rimraf");
const Config = require("webpack-chain");
const config = new Config();

const resolve = src => path.resolve(process.cwd(), src);
// 删除dist
rimraf.sync("dist");
// 之前的基本的
// module.exports = {
//   entry: "./src/index.js",
//   mode: process.env.NODE_ENV,
//   output: {
//     filename: "bundle.js",
//     path: path.resolve(__dirname, "dist")
//   }
// };

config
  // 入口
  .entry("src/index")
  .add(resolve("src/index.js"))
  .end()
  // 模式
  //.mode(process.env.NODE_ENV) 等价下面
  .set("mode", process.env.NODE_ENV)
  // 出口
  .output.path(resolve("dist"))
  .filename("[name].bundle.js");
config.module
  .rule("css")
  .test(/\.css$/)
  .use("css")
  .loader("css-loader");
module.exports = config.toConfig();
