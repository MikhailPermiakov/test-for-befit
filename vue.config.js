const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: process.env.NODE_ENV === 'production'
      ? '/dist/index.html'
      : '/',
  transpileDependencies: true
})
