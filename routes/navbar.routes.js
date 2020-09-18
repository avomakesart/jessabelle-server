const controller = require("../controllers/navbar/navbar.controller");
const socialController = require("../controllers/navbar/navbar-social.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  /// Homepage
  app.post("/api/navbar", controller.createNavbar);
  app.get("/api/navbar", controller.getNavbarInfo);
  app.get("/api/navbar/:id", controller.getNavbarInfoById);
  app.put("/api/navbar/:id", controller.updateNavbarInfo);
  app.delete("/api/navbar/:id", controller.deleteNavbar);

  app.post("/api/navbar_social", socialController.createNavbarSocial);
  app.get("/api/navbar_social", socialController.getNavbarSocial);
  app.get("/api/navbar_social/:id", socialController.getNavbarSocialById);
  app.put("/api/navbar_social/:id", socialController.updateNavbarSocial);
  app.delete("/api/navbar_social/:id", socialController.deleteNavbarSocial);
};
