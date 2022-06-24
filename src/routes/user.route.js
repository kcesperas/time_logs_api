// const { verifySignUp, authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");


module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/admin/users",
    controller.createRecord
  );

  app.put(
    "/admin/users/:id",
    controller.updateRecordById
  );


  app.get(
    "/admin/users",
    controller.getAllRecords
  );

  app.get(
    "/admin/users/:id",
    controller.getRecordById
  );

  app.delete(
    "/admin/users/:id",
    controller.deleteRecordById
  );
};