const controller = require("../controllers/homepage/homepage.controller");
const workController = require("../controllers/homepage/selected-work.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  /// Homepage
  app.post("/api/homepage", controller.createHomepage);
  app.get("/api/homepage", controller.getHomePage);
  app.get("/api/homepage/:id", controller.getHomePageById);
  app.put("/api/homepage/:id", controller.updateHomePage);
  app.delete("/api/homepage/:id", controller.deleteHomePage);

  app.post("/api/selected_work", workController.createSelectedWork);
  app.get("/api/selected_work", workController.getSelectedWork);
  app.get("/api/selected_work/:id", workController.getSelectedWorkById);
  app.put("/api/selected_work/:id", workController.updateSelectedWork);
  app.delete("/api/selected_work/:id", workController.deleteSelectedWork);
};
