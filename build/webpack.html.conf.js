const path = require('path')

module.exports = [
    {
        _html: 'index',
        dir: 'common',
        title: '首页',
        chunks: ['index', 'vendor']
    },
    {
        _html: 'login',
        title: '登录',
        dir: 'other',
        chunks: ['login', 'vendor']
    },
];