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
    let fs = require('fs')
    let ctx = this.ctx
    fs.readFile('.gitignore', 'utf-8', function (err, data) {
        if (err) {
            console.log(err);
        } else {
            console.log(data, ctx.root);
        }
    });
    await this.ctx.render('tool/clipboard.html', dataList);
  }
}

module.exports = ToolController;
