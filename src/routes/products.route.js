
const { verifySignUp, authJwt } = require("../middleware");
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
    "/api/products",
    controller.createRecord
  );

  app.post(
    "/api/products/labels",
    controller.createLabelRecord
  );





  app.put(
    "/api/products/:id",
    controller.updateRecordById
  );

  app.put(
    "/api/products/labels/:id",
    controller.updateLabelsRecordById
  );


  app.put(
    "/api/products/update-labels/:id",
    controller.updateProductLabels
  );


  app.get(
    "/api/products",
    controller.getAllRecords
  );

  app.get(
    "/api/products/labels",
    controller.getAllProductsLabels
  );

  app.get(
    "/api/products/counter",
    controller.getProductsCount
  );

  app.get(
    "/api/products/:id",
    controller.getRecordById
  );

  app.delete(
    "/api/products",
    controller.deleteRecordById
  );

  app.delete(
    "/api/products/labels/:id",
    controller.deleteLabelsRecord
  );

};