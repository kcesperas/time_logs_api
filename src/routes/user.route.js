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
    "/users",
    controller.createRecord
  );

  // app.put(
  //   "/users/:id",
  //   controller.updateRecordById
  // );


  app.get(
    "/users",
    // [authJwt.verifyToken],
    controller.getAllRecords
  );

  app.get(
    "/users/:id",
    [authJwt.verifyToken],
    controller.getRecordById
  );

  app.delete("/users", [authJwt.verifyToken, authJwt.isAdmin], controller.deleteUser);
  app.put("/users/suspend", [authJwt.verifyToken, authJwt.isAdmin], controller.suspendUser);
  app.put("/users/activate", [authJwt.verifyToken, authJwt.isAdmin], controller.activateUser);
};