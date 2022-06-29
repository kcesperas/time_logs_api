// const { verifySignUp, authJwt } = require("../middleware");
const controller = require("../controllers/purchases.controller");


module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/admin/purchases",
    controller.createRecord
  );

  app.put(
    "/admin/purchases/:id",
    controller.updateRecordById
  );



  app.get(
    "/admin/purchases",
    controller.getAllRecords
  );

  app.get(
    "/admin/purchases/:id",
    controller.getRecordById
  );

  app.delete(
    "/admin/purchases/:id",
    controller.deleteRecordById
  );
};