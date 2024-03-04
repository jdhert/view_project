const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave : false
})

module.exports = {
  chainWebpack: config =>{
    config.plugins.delete('prefetch');  // prefetch 삭제
  },
  devServer: {
    proxy: {
      "/api": {	
        target: "http://localhost:8080", // 프록시를 설정할 도메인
        changeOrigin: true,
      },
      '/oauth2.0':{
        target: 'https://nid.naver.com'
      } 
    }
  },
  lintOnSave: false
}