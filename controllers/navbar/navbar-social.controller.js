const pool = require("../../config/projects.config");

// Post HOME info
exports.createNavbarSocial = async (req, res) => {
  try {
    const { icon, alt_text, link } = req.body;

    const newEntry = await pool.query(
      "INSERT INTO navbar_social (icon, alt_text, link) VALUES($1, $2, $3) RETURNING *",
      [icon, alt_text, link]
    );

    res.json(newEntry);
  } catch (err) {
    console.log(err.message);
  }
};

// Get the cta info
exports.getNavbarSocial = async (req, res) => {
  try {
    const newEntry = await pool.query("SELECT * FROM navbar_social");
    res.json(newEntry.rows);
  } catch (err) {
    console.log(err.message);
  }
};

// Get the cta info by id
exports.getNavbarSocialById = async (req, res) => {
  try {
    const { id } = req.params;
    const navbar = await pool.query(
      "SELECT * FROM navbar_social WHERE id = $1",
      [id]
    );

    res.json(navbar.rows);
  } catch (err) {
    console.log(err.message);
  }
};

// Update cta
exports.updateNavbarSocial = async (req, res) => {
  try {
    const { id } = req.params;
    const { icon, alt_text, link } = req.body;

    let iconSocial = "UPDATE navbar_social SET icon = $1 WHERE id = $2";

    let altText = "UPDATE navbar_social SET alt_text = $1 WHERE id = $2";

    let linkIcon = "UPDATE navbar_social SET link = $1 WHERE id = $2";

    await pool.query(
      iconSocial,

      [icon, id]
    );

    await pool.query(
      altText,

      [alt_text, id]
    );

    await pool.query(
      linkIcon,

      [link, id]
    );

    res.json("Navbar content has been updated");
  } catch (err) {
    console.log(err.message);
  }
};

// Delete cta
exports.deleteNavbarSocial = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM navbar_social WHERE id = $1", [id]);
    res.json("Homepage content has been deleted");
  } catch (err) {
    console.log(err.message);
  }
};
