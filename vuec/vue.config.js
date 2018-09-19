// vue.config.js
module.exports = {
    baseUrl: process.env.NODE_ENV === 'production'
    ? '/public/' : '/public/',
    configureWebpack: {
        devtool: 'source-map',
        externals: {
            'vuePlugin':'vuePlugin',
        },
    },
}
