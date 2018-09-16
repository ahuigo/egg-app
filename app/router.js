module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/tmp/:file', async (ctx) => ctx.body = require('fs').readFileSync(`tmp/${ctx.params.file}`).toString())

  router.get('/tool/clipboard', controller.tool.clipboard);
  router.get('/api/clipboard/header', controller.api.clipboard.header);
  router.post('/api/clipboard/header', controller.api.clipboard.header);
  router.post('/api/clipboard/uploadFile', controller.api.clipboard.uploadFile);
  router.resources('clip','/api/clipboard', controller.api.clipboard);

  router.resources('word','/api/word', controller.api.word);
  router.get('/api/word/getWord', controller.api.word.getWord);
};