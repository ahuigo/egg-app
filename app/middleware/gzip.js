const isJSON = require('koa-is-json');
const zlib = require('zlib');

async function gzip(ctx, next) {
    await next();

    let body = ctx.body;
    if (!body) return;
    if (isJSON(body)) body = JSON.stringify(body);

    // 设置 gzip body，修正响应头
    const stream = zlib.createGzip();
    stream.end(body);
    ctx.body = stream;
    ctx.set('Content-Encoding', 'gzip');
}
module.exports = options => {console.log(options); return gzip}
module.exports = options => gzip;