'use strict';
//module.exports
var config = {
  middleware: ['errorHandler'],

  errorHandler: {
    match: '/api',
  },

  keys: 'appInfo.name' + '_1530272149244_7969',
  view: { defaultViewEngine: 'nunjucks', },
  onerror: {
    errorPageUrl: (err, ctx) => ctx.errorPageUrl || '/500',
  },

  multipart: {
    fileExtensions: ['', '.'], // 增加对 .apk 扩展名的支持
  },
};

//support raw text
const bodyParserConfig = {
  enable: true,
  encoding: 'utf8',
  formLimit: '100kb',
  jsonLimit: '100kb',
  strict: true,
  // @see https://github.com/hapijs/qs/blob/master/lib/parse.js#L8 for more options
  queryString: {
    arrayLimit: 100,
    depth: 5,
    parameterLimit: 1000,
  },
  enableTypes: ['json', 'form', 'text'],
  extendTypes: {
    text: ['text/xml', 'application/xml'],
  },
};
// 覆盖egg自带的配置
config.bodyParser = bodyParserConfig;

for (let [key, value] of Object.entries(config)) {
  exports[key] = value;
}

exports.static= {
  dir: ['vuec/dist', 'vuec/extra'],//path.join(appInfo.baseDir, 'app/public')
}
exports.logger = {
  consoleLevel: 'INFO', //默认
  consoleLevel: 'DEBUG',
  allowDebugAtProd: false, //默认
};

exports.security = {
  csrf: false
};
/*
function accepts(ctx) {
  if (ctx.get('x-requested-with') === 'XMLHttpRequest') return 'json';
  return 'html';
}*/

/**
 * sqlite
 */
exports.sequelize = {
  dialect: 'sqlite', // support: mysql, mariadb, postgres, mssql
  storage: './data/coca.sqlite',
  database: 'test',
  host: 'localhost',
  port: '3306',
  username: 'root',
  password: '',
  // delegate: 'myModel', // load all models to `app[delegate]` and `ctx[delegate]`, default to `model`
  // baseDir: 'my_model', // load all files in `app/${baseDir}` as models, default to `model`
  // exclude: 'index.js', // ignore `app/${baseDir}/index.js` when load models, support glob and array
  // more sequelize options
};
