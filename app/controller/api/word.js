const BaseController = require('core/base_controller')
//const fs = require('fs')
//var tmp = require('tmp');

module.exports =
  class WordController extends BaseController {
    async index() {
      await this.show()
    }
    async getWord() {
      let ctx = this.ctx
      let id = this.ctx.params.id ? +this.ctx.params.id : undefined;
      var res = ({ oss: [ctx.oss], files: files, fields: fields, root: APP_ROOT, body: ctx.request.body, query: ctx.query, 'x-requested-with': ctx.get('x-requested-with') })
      this.rest({ content: res, path: clipPath })
    }

    /**
     * POST
     */
    async create() {
      let ctx = this.ctx
      let [clipPath, id] = this.getClipPath(null, true)
      var res = 'ok';
      if (ctx.request.body.content)
        fs.writeFileSync(clipPath, ctx.request.body.content)
      else {
        res = 'require content'
        this.throw(res)
      }

      //this.ctx.app.rest([res, this.ctx.get('content-type')])
      this.rest({ content: res , id})
    }
  }