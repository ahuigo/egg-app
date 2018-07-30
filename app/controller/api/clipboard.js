const BaseController = require('core/base_controller')
const fs = require('fs')
var tmp = require('tmp');

module.exports =
  class ClipboardController extends BaseController {
    async header() {
      const ctx = this.ctx;
      // return this.rest([this.ctx.get('Content-Type'), APP_ROOT])
      const [files, fields] = await this.multipart();
      var res = ({ oss: [ctx.oss], files: files, fields: fields, root: APP_ROOT, body: ctx.request.body, query: ctx.query, 'x-requested-with': ctx.get('x-requested-with') })
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

    /**
     * POST
     */
    async uploadFile() {
      const ctx = this.ctx
      const md5 = this.ctx.query.md5
      if (!/^[0-9a-f]+$/.test(md5)) {
        this.throw('Bad md5');
      }

      let uploadPath = `tmp/upload-${md5}`;
      if (!fs.existsSync(uploadPath)) {
        fs.appendFileSync(uploadPath, '')
      }

      var chunkStat = fs.statSync(uploadPath)
      if (1 || chunkStat.size < ctx.query.size && chunkStat.size === +ctx.query.start) {
        const rs = await this.ctx.getFileStream()
        const ws = fs.createWriteStream(uploadPath, { flags: 'a' })
        const bytesRead = await new Promise((resolve, reject) => {
          const ps = rs.pipe(ws)
          ps.on('finish', () => resolve(ws.bytesWritten))
          ps.on('error', reject)
        })
        console.log(__line, 'outen', { bytesRead, c_size: chunkStat.size, rs_read: rs.bytesRead, ws_wr: ws.bytesWritten })
        if (bytesRead < 1) {
          this.throw('Bad write to file')
        }
        chunkStat.size += bytesRead
      }
      this.rest({
        uploadPath,
        next_start: chunkStat.size,
      })

      //this.ctx.app.rest([res, this.ctx.get('content-type')])
      //this.ctx.rest([res, this.ctx.get('accept')])
    }
    async index() {
      let id = this.ctx.request.query.id || '0';
      let ctx = this.ctx
      let clipPath = 'tmp/clip-' + id;
      var res = fs.readFileSync(clipPath, 'utf8')

      //this.ctx.app.rest([res, this.ctx.get('content-type')])
      this.rest({content:res})
    }
    /**
     * POST
     */
    async create() {
      let id = this.ctx.request.query.id || '0';
      let ctx = this.ctx
      let clipPath = 'tmp/clip-' + id;
      var res = 'ok';
      if(ctx.request.body.content)
        fs.writeFileSync(clipPath, ctx.request.body.content)
      else{
        res = 'require content'
        this.throw(res)
      }

      //this.ctx.app.rest([res, this.ctx.get('content-type')])
      this.rest({content:res})
    }
  }