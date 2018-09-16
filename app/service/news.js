'use strict';
const Service = require('egg').Service;

class NewsService extends Service {
   list(page = 1) {
    return [1,2,3,4];
  }
}

module.exports = NewsService;