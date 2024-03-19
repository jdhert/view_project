const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  chainWebpack: config => {
    config.plugins.delete('prefetch'); // This deletes the prefetch plugin
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
      // Updated proxy configuration for Google Maps
      "/googlemap": { 
        target: "https://maps.googleapis.com",
        changeOrigin: true,
        pathRewrite: { '^/googlemap': '/maps/api/place/textsearch/json' }, // Rewrite path
      },
      "/googleimg": {
        target: "https://maps.googleapis.com",
        changeOrigin: true,
        pathRewrite: { '^/googleimg': '/maps/api/place/photo'},
      }
    }
  },
});