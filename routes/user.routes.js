const { authJwt } = require("../middlewares");
const controller = require("../controllers/auth/user.controller");
const userController = require("../controllers/users/users.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // User
  app.get("/api/test/all", controller.allAccess);
  app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);

  // Update values
  app.get("/api/users", userController.getUsers);
  app.get("/api/users/:id", userController.getUsersById);
  app.put("/api/users/:id", userController.updateUser);
  app.delete("/api/users/:id", userController.deleteUser);

  // Mod
  app.get(
    "/api/test/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );

  // Admin
  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
};
