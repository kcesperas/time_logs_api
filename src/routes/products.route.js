
// const { verifySignUp, authJwt } = require("../middleware");
const controller = require("../controllers/products.controller");


module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/admin/products",
    controller.createRecord
  );

  app.put(
    "/admin/products/:id",
    controller.updateRecordById
  );



  app.get(
    "/admin/products",
    controller.getAllRecords
  );

  app.get(
    "/admin/products/:id",
    controller.getRecordById
  );

  app.delete(
    "/admin/products/:id",
    controller.deleteRecordById
  );
};