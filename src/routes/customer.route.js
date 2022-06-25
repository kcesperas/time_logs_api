// const { verifySignUp, authJwt } = require("../middleware");
const controller = require("../controllers/customer.controller");


module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/admin/customers",
    controller.createRecord
  );

  app.put(
    "/admin/customers/:id",
    controller.updateRecordById
  );


  app.get(
    "/admin/customers",
    controller.getAllRecords
  );

  app.get(
    "/admin/customers/:id",
    controller.getRecordById
  );

  app.delete(
    "/admin/customers/:id",
    controller.deleteRecordById
  );
};