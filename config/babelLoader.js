// babel-loader配置
module.exports = (config, resolve) => {
  const baseRule = config.module.rule("js").test(/\.js|\.tsx?$/);
  const babelPath = resolve("babel.js");
  const babelConf = require(babelPath);
  const version = require(resolve("node_modules/@babel/core/package.json"))
    .version;
  return () => {
    baseRule
      .use("babel")
      .loader(require.resolve("babel-loader"))
      .options({
        presets: [
          [
            "@babel/preset-typescript",
            {
              allExtensions: true
            }
          ]
        ],
        plugins: [
          "@babel/plugin-transform-typescript",
          "transform-class-properties",
          "@babel/proposal-object-rest-spread"
        ]
      });
  };
};
