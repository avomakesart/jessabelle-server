const pool = require("../../config/projects.config");

// Post HOME info
exports.createNavbar = async (req, res) => {
  try {
    const {
      link_color,
      link_text,
    } = req.body;


    const newEntry = await pool.query(
      "INSERT INTO navbar (link_color, link_text) VALUES($1, $2) RETURNING *",
      [link_color, link_text]
    );

    res.json(newEntry);
  } catch (err) {
    console.log(err.message);
  }
};

// Get the cta info
exports.getNavbarInfo = async (req, res) => {
  try {
    const newEntry = await pool.query("SELECT * FROM navbar");
    res.json(newEntry.rows);
  } catch (err) {
    console.log(err.message);
  }
};

// Get the cta info by id
exports.getNavbarInfoById = async (req, res) => {
  try {
    const { id } = req.params;
    const navbar = await pool.query("SELECT * FROM navbar WHERE id = $1", [id]);

    res.json(navbar.rows);
  } catch (err) {
    console.log(err.message);
  }
};

// Update cta
exports.updateNavbarInfo = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      link_color,
      link_text,
    } = req.body;

    let linkColor =
      "UPDATE navbar SET link_color = $1 WHERE id = $2";

    let linkText = "UPDATE navbar SET link_text = $1 WHERE id = $2";

    await pool.query(
      linkColor,

      [link_color, id]
    );

    await pool.query(
      linkText,

      [link_text, id]
    );

    res.json("Navbar content has been updated");
  } catch (err) {
    console.log(err.message);
  }
};

// Delete cta
exports.deleteNavbar = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM navbar WHERE id = $1", [id]);
    res.json("Homepage content has been deleted");
  } catch (err) {
    console.log(err.message);
  }
};
