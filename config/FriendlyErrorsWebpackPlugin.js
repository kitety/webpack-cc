// 友好的错误提示
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");

module.exports = (config, resolve) => {
  return () => {
    config.plugin("error").use(FriendlyErrorsWebpackPlugin);
  };
};
