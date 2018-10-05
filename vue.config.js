module.exports = {
  lintOnSave: false,
  chainWebpack: config => {
    config.plugins.delete("split-manifest").delete("inline-manifest");
  },
};
