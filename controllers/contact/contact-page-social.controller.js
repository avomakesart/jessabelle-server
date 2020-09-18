const pool = require("../../config/projects.config");

// Post card
exports.createSocialContent = async (req, res) => {
  try {
    const { title, link, color } = req.body;

    const socialTitle = title;
    const socialLink = link;
    const socialColor = color;

    const newEntry = await pool.query(
      "INSERT INTO contactpage_social (title, link, color) VALUES($1, $2) RETURNING *",
      [socialTitle, socialLink, socialColor]
    );

    res.json(newEntry);
  } catch (err) {
    console.log(err.message);
  }
};

// Get the cards
exports.getSocialContent = async (req, res) => {
  try {
    const newEntry = await pool.query("SELECT * FROM contactpage_social");
    res.json(newEntry.rows);
  } catch (err) {
    console.log(err.message);
  }
};

// Get the card by ID
exports.getSocialContentById = async (req, res) => {
  try {
    const { id } = req.params;
    const about = await pool.query(
      "SELECT * FROM contactpage_social WHERE id = $1",
      [id]
    );

    res.json(about);
  } catch (err) {
    console.log(err.message);
  }
};

// Update a card
exports.updateSocialContent = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, link, color } = req.body;

    let socialTitle = "UPDATE contactpage_social SET title = $1 WHERE id = $2";

    let socialLink = "UPDATE contactpage_social SET link = $1 WHERE id = $2";

    let socialColor = "UPDATE contactpage_social SET color = $1 WHERE id = $2";

    await pool.query(
      socialTitle,

      [title, id]
    );

    await pool.query(
      socialLink,

      [link, id]
    );

    await pool.query(
      socialColor,

      [color, id]
    );

    res.json("Social has been updated");
  } catch (err) {
    console.log(err.message);
  }
};

// Delete card
exports.deleteSocialContent = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM contactpage_social WHERE id = $1", [id]);
    res.json("Social Info has been deleted");
  } catch (err) {
    console.log(err.message);
  }
};
