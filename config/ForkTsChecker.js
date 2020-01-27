// ts静态类型检查
const ForkCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const ForkTsCheckerNotifierWebpackPlugin = require("fork-ts-checker-notifier-webpack-plugin");

module.exports = (config, resolve) => {
  return () => {
    config.plugin("ts-fork").use(ForkCheckerWebpackPlugin, [
      {
        // 将async设为false，可以阻止Webpack的emit以等待类型检查器/linter，并向Webpack的编译添加错误。
        async: false,
        tsconfig: resolve("tsconfig.json")
      }
    ]);
    // 将ts类型检查错误用弹框提示
    // 如果fork-ts-checker-notifier-webpack-plugin的async为false时可以不用
    // 否则建议使用，以方便发现错误
    config.plugin("ts-notifier").use(ForkTsCheckerNotifierWebpackPlugin, [
      {
        title: "TS",
        excludeWarning: true,
        skipSuccessful: true
      }
    ]);
  };
};
