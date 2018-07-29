'use strict';
//exports.keys='abcdef'//不用回调
//module.exports
var config = {
  // 加载 errorHandler 中间件
  middleware: ['errorHandler'],
  // 只对 /api 前缀的 url 路径生效
  errorHandler: {
    match: '/api',
  },
  keys: 'appInfo.name' + '_1530272149244_7969',
  view: { defaultViewEngine: 'nunjucks', },
  onerror: {
    errorPageUrl: (err, ctx) => ctx.errorPageUrl || '/500',
  },
  multipart: {
    fileExtensions: [ '' , '.'], // 增加对 .apk 扩展名的支持
  },
};
for(let [key, value] of Object.entries(config)) {
  exports[key] = value;
}

exports.security = {
  csrf: false
};
/*
function accepts(ctx) {
  if (ctx.get('x-requested-with') === 'XMLHttpRequest') return 'json';
  return 'html';
}*/
