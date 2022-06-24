// const { verifySignUp, authJwt } = require("../middleware");
const controller = require("../controllers/pricing.controller");


module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/admin/pricings",
    controller.createRecord
  );

  app.put(
    "/admin/pricings/:id",
    controller.updateRecordById
  );


  app.get(
    "/admin/pricings",
    controller.getAllRecords
  );

  app.get(
    "/admin/pricings/:id",
    controller.getRecordById
  );

  app.delete(
    "/admin/pricings/:id",
    controller.deleteRecordById
  );
};