const { verifySignUp, authJwt } = require("../middleware");
const controller = require("../controllers/auth.controller");


module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );


    //DONE USER/SIGN-IN BY KURT
  app.post("/api/auth/login", controller.login);

    //GET
  app.get("/api/auth", [authJwt.verifyToken], controller.getAuthUser);
  // app.get("/auth/:userId", [authJwt.verifyToken], controller.getAuthUser);
  app.get("/api/auth/logout", [authJwt.verifyToken], controller.logout);
  // app.put("/auth/users/suspend", [authJwt.verifyToken, authJwt.isAdmin], controller.suspendUser);
  // app.put("/auth/users/activate", [authJwt.verifyToken, authJwt.isAdmin], controller.activateUsers);
  
  // app.delete("/auth/users", [authJwt.verifyToken, authJwt.isAdmin], controller.deleteUser);

};