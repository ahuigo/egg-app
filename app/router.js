module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/tool/clipboard', controller.tool.clipboard);
  router.get('/api/clipboard/header', controller.api.clipboard.header);
  router.post('/api/clipboard/header', controller.api.clipboard.header);
  router.resources('clip','/api/clipboard', controller.api.clipboard);
};