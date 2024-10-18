module.exports = {
    devServer: {
        proxy: 'http://group-order-lb-621478777.ap-southeast-1.elb.amazonaws.com/'
        //  proxy: 'http://3.211.129.88/'
    },
    configureWebpack: {

    }
}
