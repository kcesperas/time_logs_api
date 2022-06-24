// const { verifySignUp, authJwt } = require("../middleware");

const controller = require("../controllers/payment.controller");



module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
    app.post('/admin/payments', controller.createRecord);
    app.get('/admin/payments', controller.findAll);
    app.get('/admin/payments/:id', controller.getById);
    app.put('/admin/payments/:id', controller.updateById);
    app.delete('/admin/payments/:id', controller.deleteById);




  });

}