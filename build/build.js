const rimraf = require("rimraf");
// 优雅的终端的loading 转轮
const ora = require("ora");
// 终端文字的样式
const chalk = require("chalk");
const path = require("path");
// 删除dist目录
rimraf.sync(path.join(process.cwd(), "dist"));

const config = require("./base")();
const webpack = require("webpack");
const spinner = ora("开始构建项目....");
spinner.start();

webpack(config.toConfig(), function(err, stats) {
  spinner.stop();
  if (err) {
    throw err;
  }
  process.stdout.write(
    stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + "\n\n"
  );

  // 这个是个函数
  if (stats.hasErrors()) {
    console.log(chalk.red("构建失败\n"));
    process.exit(1);
  } else {
    console.log(chalk.cyan("build完成\n"));
  }
});
