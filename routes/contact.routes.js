const controller = require("../controllers/contact/contact.controller");
const formController = require("../controllers/contact/contact-form.controller");
const socialController = require("../controllers/contact/contact-page-social.controller");
const message = require("../controllers/contact/contact-message.controller")

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Contact routes
  app.post("/api/contactpage", controller.createContactInfo);
  app.get("/api/contactpage", controller.getContactInfo);
  app.get("/api/contactpage/:id", controller.getContactInfoById);
  app.put("/api/contactpage/:id", controller.updateContactInfo);
  app.delete("/api/contactpage/:id", controller.deleteContactInfo);

  app.post("/api/contactpage_social", socialController.createSocialContent);
  app.get("/api/contactpage_social", socialController.getSocialContent);
  app.get("/api/contactpage_social/:id", socialController.getSocialContentById);
  app.put("/api/contactpage_social/:id", socialController.updateSocialContent);
  app.delete(
    "/api/contactpage_social/:id",
    socialController.deleteSocialContent
  );

  // Messages
  app.post("/api/messages", message.createMessage);
  app.get("/api/messages", message.getMessage);
  app.get("/api/messages/:id", message.getMessageById);
  app.delete("/api/messages/:id", message.deleteMessage);

  // Contact routes
  app.post("/api/contactform", formController.createContactFormInfo);
  app.get("/api/contactform", formController.getContactFormInfo);
  app.get("/api/contactform/:id", formController.getContactFormInfoById);
  app.put("/api/contactform/:id", formController.updateContactFormInfo);
  app.delete("/api/contactform/:id", formController.deleteContactFormInfo);
};
