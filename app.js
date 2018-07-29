let path = require('path')

// require node_path
process.env.NODE_PATH = path.resolve(__dirname, 'app/') ;
require('module').Module._initPaths();
global.APP_ROOT = __dirname+'/app';
require('core/base_controller')

module.exports = app => {
};