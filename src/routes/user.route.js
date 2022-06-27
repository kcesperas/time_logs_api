// const { verifySignUp, authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");
const { authJwt } = require("../middleware");
const { isAdmin } = require("../middleware/authJwt");


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
    // [authJwt.verifyToken],
    controller.getAllRecords
  );

  app.get(
    "/admin/users/:id",
    [authJwt.verifyToken],
    controller.getRecordById
  );

  app.delete(
    "/admin/users/:id",
    [authJwt.verifyToken],
    controller.deleteRecordById
  );
};