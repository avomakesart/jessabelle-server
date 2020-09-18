const pool = require("../../config/projects.config");

// Post HOME info
exports.createGlobalStyles = async (req, res) => {
  try {
    const { background_body, color } = req.body;

    const backGroundBody = background_body;
    const bodyColor = color;

    const newEntry = await pool.query(
      "INSERT INTO global_styles (background_body, color) VALUES($1, $2) RETURNING *",
      [backGroundBody, bodyColor, linkColor, mobileMenuColor]
    );

    res.json(newEntry);
  } catch (err) {
    console.log(err.message);
  }
};

// Get the cta info
exports.getGlobalStyles = async (req, res) => {
  try {
    const newEntry = await pool.query("SELECT * FROM global_styles");
    res.json(newEntry.rows);
  } catch (err) {
    console.log(err.message);
  }
};

// Get the cta info by id
exports.getGlobalStylesById = async (req, res) => {
  try {
    const { id } = req.params;
    const globals = await pool.query(
      "SELECT * FROM global_styles WHERE id = $1",
      [id]
    );

    res.json(globals.rows);
  } catch (err) {
    console.log(err.message);
  }
};

// Update cta
exports.updateGlobalStyles = async (req, res) => {
  try {
    const { id } = req.params;
    const { background_body, color } = req.body;

    let backgroundBody =
      "UPDATE global_styles SET background_body = $1 WHERE id = $2";

    let bodyColor = "UPDATE global_styles SET color = $1 WHERE id = $2";

    await pool.query(
      backgroundBody,

      [background_body, id]
    );

    await pool.query(
      bodyColor,

      [color, id]
    );

    res.json("Styles has been updated");
  } catch (err) {
    console.log(err.message);
  }
};

// Delete cta
exports.deleteGlobalStyles = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM global_styles WHERE id = $1", [id]);
    res.json("Styles has been deleted");
  } catch (err) {
    console.log(err.message);
  }
};
