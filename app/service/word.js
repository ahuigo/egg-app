'use strict';
const Service = require('egg').Service;

module.exports 
class WordService extends Service {
  async fetchWord(page = 1) {
    return [1,2,3,4];
  }
  async saveWord(){

  }
}
