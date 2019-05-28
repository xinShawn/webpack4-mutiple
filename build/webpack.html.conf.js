// html自动生成插件的模板配置

module.exports = [
    {
        title: '首页', // 页面的title
        _html: 'index', // 需要创建的名和源文件名
        chunks: ['index', 'vendor'] // 页面需要引入的分块 chunk
    },
    {
        title: '登录',
        _html: 'login',
        chunks: ['login', 'vendor']
    },
];