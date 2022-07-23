// const { verifySignUp, authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");
const { authJwt } = require("../middleware");
// const { isAdmin } = require("../middleware/authJwt");


module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/users",
    controller.createRecord
  );
  // app.put(
  //   "/api/users/:id",
  //   controller.updateRecordById
  // );
  app.get(
    "/api/users",
    // [authJwt.verifyToken],
    controller.getAllRecords
  );

  app.get(
    "/api/users/:id",
    [authJwt.verifyToken],
    controller.getRecordById
  );

  app.put("/api/users/forgotpassword",
  //  [authJwt.verifyToken],
    controller.forgotPassword);
  // app.get("/api/users/suspend/:id", 
  // // [authJwt.verifyToken], 
  // controller.suspendUser);
  // app.get("/api/users/activate/:id", 
  // // [authJwt.verifyToken], 
  // controller.activateUser);
};