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
    "/purchases",
    controller.createRecord
  );

  app.put(
    "/purchases/:id",
    controller.updateRecordById
  );



  app.get(
    "/purchases",
    controller.getAllRecords
  );

  app.get(
    "/purchases/:id",
    controller.getRecordById
  );

  app.delete(
    "/purchases/:id",
    controller.deleteRecordById
  );
};