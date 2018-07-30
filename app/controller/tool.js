const Controller = require('egg').Controller;

class ToolController extends Controller {
  async index() {
    this.ctx.body = 'Clipboard world!!';
  }
  async clipboard() {
    const dataList = {
      list: [
        { id: 1, title: 'this is news 1', url: '/news/1' },
        { id: 2, title: 'this is news 2', url: '/news/2' }
      ]
    };
    await this.ctx.render('tool/clipboard.html', dataList);
  }
}

module.exports = ToolController;
