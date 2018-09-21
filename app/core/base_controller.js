// app/core/base_controller.js
const app = require('egg');

module.exports =
  app.BaseController =
  class BaseController extends app.Controller {
    rest(rest) {
      this.ctx.body = typeof rest === 'object' ? rest : JSON.stringify(rest)
      this.ctx.type = 'application/json';
    }

    throw(msg) {
      msg = msg || 'unknown';
      this.ctx.throw(400, msg);
    }

    buildURLQuery(obj){
      return Object.entries(obj)
            .map(pair => pair.map(encodeURIComponent).join('='))
            .join('&');
    }


    async multipart() {
      const tmp = require('tmp')
      const fs = require('fs')
      const ctx = this.ctx
      const files = [];
      ctx.files = files
      let fields, part;
      if (this.ctx.get('Content-Type').startsWith('multipart/')) {
        try {
          // const file = await ctx.getFileStream()
          // files.push(file);
          // fields = stream.fields;
          // const sendToWormhole = require('stream-wormhole');
          // let result = await ctx.oss.put('egg-multipart-test/' + part.filename, part);
          // await sendToWormhole(part);
          const parts = ctx.multipart({ autoFields: true });
          while ((part = await parts()) != null) {
            if (part.length) {
            } else if (part.filename) {
              const tmpFile = tmp.fileSync({prefix: 'eggjs-upload-'})
              const ws = fs.createWriteStream(null, {fd:tmpFile.fd})
              part.pipe(ws)
              part.path = tmpFile.name
              part.fd = tmpFile.fd
              files.push(part)
            }
          }
          fields = parts.field
        } catch (err) {
          //await sendToWormhole(part);
          throw err;
        }
      }
      return [files, fields];
    }
  }
