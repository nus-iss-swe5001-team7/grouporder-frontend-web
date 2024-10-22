module.exports = {
    devServer: {
        // proxy: 'http://localhost:8765/'
        //proxy: 'http://group-order-lb-621478777.ap-southeast-1.elb.amazonaws.com/'
        proxy: 'https://d20bde94kgtbik.cloudfront.net/'
    },
    configureWebpack: {

    }
}
