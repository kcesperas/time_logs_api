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
    "/auth/signup",
    [
      verifySignUp.checkDuplicateEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );


    //DONE USER/SIGN-IN BY KURT
  app.post("/auth/signin", controller.signin);

    //GET
  app.get("/auth", [authJwt.verifyToken], controller.getAuthUser);
  // app.get("/auth/:userId", [authJwt.verifyToken], controller.getAuthUser);
  app.put("/auth/logout", [authJwt.verifyToken], controller.logout);
  // app.put("/auth/users/suspend", [authJwt.verifyToken, authJwt.isAdmin], controller.suspendUser);
  // app.put("/auth/users/activate", [authJwt.verifyToken, authJwt.isAdmin], controller.activateUsers);
  
  // app.delete("/auth/users", [authJwt.verifyToken, authJwt.isAdmin], controller.deleteUser);

};