module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "@/styles/variable.scss";'
      }
    }
  }
}
