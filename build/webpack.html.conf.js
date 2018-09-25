const path = require('path')

module.exports = [
    {
        _html: 'index',
        dir: 'common',
        title: '首页',
        chunks: ['vendor', 'index']
    },
    {
        _html: 'login',
        title: '登录',
        dir: 'other',
        chunks: ['vendor', 'login']
    },
];