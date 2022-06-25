// const { verifySignUp, authJwt } = require("../middleware");
const controller = require("../controllers/order.controller");


module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/admin/orders",
    controller.createRecord
  );

  app.put(
    "/admin/orders/:id",
    controller.updateRecordById
  );


  app.get(
    "/admin/orders",
    controller.getAllRecords
  );

  app.get(
    "/admin/orders/:id",
    controller.getRecordById
  );

  app.delete(
    "/admin/orders/:id",
    controller.deleteRecordById
  );
};