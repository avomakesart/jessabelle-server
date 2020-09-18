const controller = require("../controllers/about/about.controller");
const socialController = require("../controllers/about/about-page-social.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Card
  app.post("/api/aboutpage", controller.createAboutPage);
  app.get("/api/aboutpage", controller.getAboutPage);
  app.get("/api/aboutpage/:id", controller.getAboutPageById);
  app.put("/api/aboutpage/:id", controller.updateAboutPage);
  app.delete("/api/aboutpage/:id", controller.deleteAboutPage);

  app.post("/api/aboutpage_social", socialController.createSocialContent);
  app.get("/api/aboutpage_social", socialController.getSocialContent);
  app.get("/api/aboutpage_social/:id", socialController.getSocialContentById);
  app.put("/api/aboutpage_social/:id", socialController.updateSocialContent);
  app.delete("/api/aboutpage_social/:id", socialController.deleteSocialContent);
};
