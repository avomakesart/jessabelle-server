const pool = require("../../config/projects.config");

// Post HOME info
exports.createHomepage = async (req, res) => {
  try {
    const {
      background_body,
      hero_image,
      hero_title,
      selected_work_title,
    } = req.body;

    const backGroundBody = background_body;
    const heroImage = hero_image;
    const heroTitle = hero_title;
    const sectionTitle = selected_work_title;

    const newEntry = await pool.query(
      "INSERT INTO homepage (background_body, hero_image, hero_title, selected_work_title) VALUES($1, $2, $3, $4) RETURNING *",
      [backGroundBody, heroImage, heroTitle, sectionTitle]
    );

    res.json(newEntry);
  } catch (err) {
    console.log(err.message);
  }
};

// Get the cta info
exports.getHomePage = async (req, res) => {
  try {
    const newEntry = await pool.query("SELECT * FROM homepage");
    res.json(newEntry.rows);
  } catch (err) {
    console.log(err.message);
  }
};

// Get the cta info by id
exports.getHomePageById = async (req, res) => {
  try {
    const { id } = req.params;
    const home = await pool.query("SELECT * FROM homepage WHERE id = $1", [id]);

    res.json(home.rows);
  } catch (err) {
    console.log(err.message);
  }
};

// Update cta
exports.updateHomePage = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      background_body,
      hero_image,
      hero_title,
      selected_work_title,
    } = req.body;

    let backgroundBody =
      "UPDATE homepage SET background_body = $1 WHERE id = $2";

    let heroImage = "UPDATE homepage SET hero_image = $1 WHERE id = $2";

    let heroTitle = "UPDATE homepage SET hero_title = $1 WHERE id = $2";

    let selectedWork =
      "UPDATE homepage SET selected_work_title = $1 WHERE id = $2";

    await pool.query(
      backgroundBody,

      [background_body, id]
    );

    await pool.query(
      heroImage,

      [hero_image, id]
    );

    await pool.query(
      heroTitle,

      [hero_title, id]
    );

    await pool.query(
      selectedWork,

      [selected_work_title, id]
    );

    res.json("Homepage content has been updated");
  } catch (err) {
    console.log(err.message);
  }
};

// Delete cta
exports.deleteHomePage = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM homepage WHERE id = $1", [id]);
    res.json("Homepage content has been deleted");
  } catch (err) {
    console.log(err.message);
  }
};
