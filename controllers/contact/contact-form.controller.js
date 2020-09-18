const pool = require("../../config/projects.config");

// Post card
exports.createContactFormInfo = async (req, res) => {
  try {
    const { label, placeholder } = req.body;

    const labelInput = label;
    const placelholderInput = placeholder;

    const newEntry = await pool.query(
      "INSERT INTO contactform (label, placeholder) VALUES($1, $2) RETURNING *",
      [labelInput, placelholderInput]
    );

    res.json(newEntry);
  } catch (err) {
    console.log(err.message);
  }
};

// Get the cards
exports.getContactFormInfo = async (req, res) => {
  try {
    const newEntry = await pool.query("SELECT * FROM contactform");
    res.json(newEntry.rows);
  } catch (err) {
    console.log(err.message);
  }
};

// Get the card by ID
exports.getContactFormInfoById = async (req, res) => {
  try {
    const { id } = req.params;
    const about = await pool.query("SELECT * FROM contactform WHERE id = $1", [
      id,
    ]);

    res.json(about);
  } catch (err) {
    console.log(err.message);
  }
};

// Update a card
exports.updateContactFormInfo = async (req, res) => {
  try {
    const { id } = req.params;
    const { label, placeholder } = req.body;

    let labelInput = "UPDATE contactform SET label = $1 WHERE id = $2";

    let placeholderInput = "UPDATE contactform SET placeholder = $1 WHERE id = $2";

    await pool.query(
        labelInput,

      [label, id]
    );

    await pool.query(
        placeholderInput,

      [placeholder, id]
    );

    res.json("Contact form info has been updated");
  } catch (err) {
    console.log(err.message);
  }
};

// Delete card
exports.deleteContactFormInfo = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM contactform WHERE id = $1", [id]);
    res.json("Contact Info has been deleted");
  } catch (err) {
    console.log(err.message);
  }
};
