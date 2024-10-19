module.exports = {
    devServer: {
        // proxy: 'http://localhost:8765/'
        proxy: 'http://group-order-lb-621478777.ap-southeast-1.elb.amazonaws.com/'
    },
    configureWebpack: {

    }
}
