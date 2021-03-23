const frontendController = {
  getIndexPage: (req, res, next) => {
    (async () => {
      res.render('frontend/index', { title: 'Express' });
    })()
    .catch(next);
  },
};
module.exports = frontendController;
