// const { verifySignUp, authJwt } = require("../middleware");
const controller = require("../controllers/phone.controller");


module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/admin/phones",
    controller.createRecord
  );

  app.put(
    "/admin/phones/:id",
    controller.updateRecordById
  );


  app.get(
    "/admin/phones",
    controller.getAllRecords
  );

  app.get(
    "/admin/phones/:id",
    controller.getRecordById
  );

  app.delete(
    "/admin/phones/:id",
    controller.deleteRecordById
  );
};