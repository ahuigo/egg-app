const Controller = require('egg').Controller;

module.exports = 
class WordController extends Controller {
  async init() {
    this.ctx.body = 'Hello world!!';
  }
}