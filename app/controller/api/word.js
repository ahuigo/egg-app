const BaseController = require('core/base_controller')
//const fs = require('fs')
//var tmp = require('tmp');

module.exports =
  class WordController extends BaseController {
    async index() {
      await this.show()
      //var res = ({ oss: [ctx.oss], files: files, fields: fields, root: APP_ROOT, body: ctx.request.body, query: ctx.query, 'x-requested-with': ctx.get('x-requested-with') })
    }
    async getWord() {
      let ctx = this.ctx
      let word = this.ctx.query.word;
      if(!word){
        this.throw('Require params: word')
      }
      
      let trans = await ctx.service.words.getWord(word)
      this.rest(trans)
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