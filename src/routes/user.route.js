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

  app.put("/users/delete",
  //  [authJwt.verifyToken],
    controller.deleteUser);
  app.get("/users/suspend/:id", 
  // [authJwt.verifyToken], 
  controller.suspendUser);
  app.get("/users/activate/:id", 
  // [authJwt.verifyToken], 
  controller.activateUser);
};