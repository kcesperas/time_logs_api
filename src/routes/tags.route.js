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
    "/admin/tags",
    controller.createRecord
  );

  app.put(
    "/admin/tags/:id",
    controller.updateRecordById
  );


  app.get(
    "/admin/tags",
    controller.getAllRecords
  );

  app.get(
    "/admin/tags/:id",
    controller.getRecordById
  );

  app.delete(
    "/admin/tags/:id",
    controller.deleteRecordById
  );
};