const controller = require("../controllers/globals/globals.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Card
  app.post("/api/global_styles", controller.createGlobalStyles);
  app.get("/api/global_styles", controller.getGlobalStyles);
  app.get("/api/global_styles/:id", controller.getGlobalStylesById);
  app.put("/api/global_styles/:id", controller.updateGlobalStyles);
  app.delete("/api/global_styles/:id", controller.deleteGlobalStyles);
};
