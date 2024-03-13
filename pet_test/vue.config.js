const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  chainWebpack: config => {
    config.plugins.delete('prefetch'); 
  },
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:8080", 
        changeOrigin: true,
      },
      '/oauth2.0': {
        target: 'https://nid.naver.com',
        changeOrigin: true,
      },
      "/googlemap": { 
        target: "https://maps.googleapis.com",
        changeOrigin: true,
      } 
    }
  }
});