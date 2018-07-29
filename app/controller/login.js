const Controller = require('egg').Controller;

class LoginController extends Controller {
  async login() {
    this.ctx.body = 'Hello world!!';
  }
}

module.exports = LoginController;
