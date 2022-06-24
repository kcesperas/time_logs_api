// const { verifySignUp, authJwt } = require("../middleware");
const controller = require("../controllers/payment.controller");


module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/admin/payments",
    controller.createRecord
  );

  // app.put(
  //   "/admin/payments/:id",
  //   controller.updateRecordById
  // );


  // app.get(
  //   "/admin/payments",
  //   controller.getAllRecords
  // );

  // app.get(
  //   "/admin/payments/:id",
  //   controller.getRecordById
  // );

  // app.delete(
  //   "/admin/payments/:id",
  //   controller.deleteRecordById
  // );
};