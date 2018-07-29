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

    async multipart() {
      const ctx = this.ctx
      const filesStream = [];
      let fields, part;
      if (this.ctx.get('Content-Type').startsWith('multipart/')) {
        try {
          // const file = await ctx.getFileStream()
          // files.push(file);
          // fields = stream.fields;
          const sendToWormhole = require('stream-wormhole');
          const parts = ctx.multipart({ autoFields: true });
          while ((part = await parts()) != null) {
            if (part.length) {
            } else if (part.filename) {
              filesStream.push(part)
              //let result = await ctx.oss.put('egg-multipart-test/' + part.filename, part);
              await sendToWormhole(part);
            }
          }
          fields = parts.field
        } catch (err) {
          //await sendToWormhole(part);
          throw err;
        }
      }
      return [filesStream, fields];
    }
  }
