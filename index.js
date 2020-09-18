const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const morgan = require("morgan");
const app = express();

app.use(
  fileUpload({
    createParentPath: true,
  })
);

// const corsOptions = {
//   origin: 'http://localhost:8200',
// }

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true, limit: "25mb" }));
app.use(bodyParser.json({ limit: "25mb" }));
app.use(morgan("dev"));

// Routes

const db = require("./models");
const Role = db.role;

// db.sequelize.sync({ force: true }).then(() => {
//   console.log('Drop and Resync Db')
//   initial()
// })

function initial() {
  Role.create({
    id: 1,
    name: "user",
  });

  Role.create({
    id: 2,
    name: "moderator",
  });

  Role.create({
    id: 3,
    name: "admin",
  });
}

app.post("/api/upload", async (req, res) => {
  try {
    if (!req.files) {
      res.send({
        status: false,
        message: "No files",
      });
    } else {
      const { picture } = req.files;

      picture.mv(`../client/public/uploads/` + picture.name);

      res.send({
        status: true,
        message: "File is uploaded",
      });
    }
  } catch (e) {
    res.status(500).send(e);
  }
});

// Global styles routes
require("./routes/globals.routes")(app);

// Navbar
require("./routes/navbar.routes")(app);

// Homepage routes
require("./routes/homepage.routes")(app);

// About routes
require("./routes/about.routes")(app);

// Blog routes
require("./routes/post.routes")(app);

// Contact routes
require("./routes/contact.routes")(app);

// Auth routes
require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
