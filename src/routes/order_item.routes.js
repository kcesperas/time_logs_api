// const { verifySignUp, authJwt } = require("../middleware");
const controller = require("../controllers/order_item.controller");


module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/admin/order_items",
    controller.createRecord
  );

  app.put(
    "/admin/order_items/:id",
    controller.updateRecordById
  );


  app.get(
    "/admin/order_items",
    controller.getAllRecords
  );

  app.get(
    "/admin/order_items/:id",
    controller.getRecordById
  );

  app.delete(
    "/admin/order_items/:id",
    controller.deleteRecordById
  );
};