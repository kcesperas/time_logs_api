// const { verifySignUp, authJwt } = require("../middleware");
const controller = require("../controllers/tags.controller");


module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/tags",
    controller.createRecord
  );

  app.put(
    "/tags/:id",
    controller.updateRecordById
  );


  app.get(
    "/tags",
    controller.getAllRecords
  );

  app.get(
    "/tags/:id",
    controller.getRecordById
  );

  app.delete(
    "/tags/:id",
    controller.deleteRecordById
  );
};