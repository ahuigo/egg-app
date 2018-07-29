//const BaseController = require('egg').BaseController;
const BaseController = require('core/base_controller')

module.exports = 
class ClipboardController extends BaseController {
  async header() {
    const ctx = this.ctx;
    // return this.rest([this.ctx.get('Content-Type'), APP_ROOT])
    const [files, fields] = await this.multipart();
    var res = ({ isIOS: [this.app,this.ctx.isIOS], files: files, fields: fields, root: APP_ROOT, body: ctx.request.body, query: ctx.query, 'x-requested-with': ctx.get('x-requested-with') })
    this.rest(res)
  }
  async index() {
    const ctx = this.ctx
    const createRule = {
      title: { type: 'string' },
      content: { type: 'string' },
    };
    // 校验参数
    ctx.validate(createRule);
    ctx.render('tool/clipboard.html')
  }
  async new() {
    let id = this.ctx.request.query.id || '0';
    let fs = require('fs');
    let clipPath = 'cache/clip-' + id;
    var res = 'null';
    if (fs.existsSync(clipPath)) {
      fs.readFile(clipPath, 'utf-8', function (err, data) {
        if (err) {
          console.log(err);
        } else {
          res = data;
        }
      });
    }
    //await ctx.service.news.list(this.ctx.query.page);

    //this.ctx.app.rest([res, this.ctx.get('content-type')])
    this.ctx.rest([res, this.ctx.get('accept')])
  }
}