const controller = require("../controllers/portfolio/post.controller");
const commentController = require("../controllers/portfolio/post-comment.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Blog Post
  app.post("/api/portfolio", controller.createPost);
  app.get("/api/portfolio", controller.getPosts);
  // Get blog post by id
  app.get("/api/portfolio/:id", controller.getPostById);
  app.put("/api/portfolio/:id", controller.updatePost);
  app.delete("/api/portfolio/:id", controller.deletePost);

  // Comments
  app.post("/api/portfolio/:id/comments", commentController.createPostComment);
  // Get all comments
  app.get("/api/portfolio/comments/:id", commentController.getPostComments);
  // Get a comment by id
  app.get(
    "/api/portfolio/:id/comments/:id",
    commentController.getPostCommentById
  );
  // Delete a project
  app.delete(
    "/api/portfolio/:id/comments/:id",
    commentController.deletePostComment
  );
};
