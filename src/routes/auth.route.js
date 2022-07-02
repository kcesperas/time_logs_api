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
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );

  app.post("/auth/signin", controller.signin);

    //GET
  app.get("/auth", [authJwt.verifyToken], controller.getAuthUser);
  app.get("/auth/:userId", [authJwt.verifyToken], controller.getAuthUser);


  app.delete("/auth/user/:id", [authJwt.verifyToken], controller.deleteUser);


};