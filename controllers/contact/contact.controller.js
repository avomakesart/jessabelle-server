const pool = require("../../config/projects.config");

// Post card
exports.createContactInfo = async (req, res) => {
  try {
    const { title, description, email, phone } = req.body;

    const contactTitle = title;
    const descriptionContact = description;
    const emailContact = email;
    const emailPhone = phone;

    const newEntry = await pool.query(
      "INSERT INTO contactpage (title, description, email, phone) VALUES($1, $2, $3, $4) RETURNING *",
      [contactTitle, descriptionContact, emailContact, emailPhone]
    );

    res.json(newEntry);
  } catch (err) {
    console.log(err.message);
  }
};

// Get the cards
exports.getContactInfo = async (req, res) => {
  try {
    const newEntry = await pool.query("SELECT * FROM contactpage");
    res.json(newEntry.rows);
  } catch (err) {
    console.log(err.message);
  }
};

// Get the card by ID
exports.getContactInfoById = async (req, res) => {
  try {
    const { id } = req.params;
    const about = await pool.query("SELECT * FROM contactpage WHERE id = $1", [
      id,
    ]);

    res.json(about);
  } catch (err) {
    console.log(err.message);
  }
};

// Update a card
exports.updateContactInfo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, email, phone } = req.body;

    let contactTitle = "UPDATE contactpage SET title = $1 WHERE id = $2";

    let contactDesc = "UPDATE contactpage SET description = $1 WHERE id = $2";

    let contactEmail = "UPDATE contactpage SET email = $1 WHERE id = $2";

    let contactPhone = "UPDATE contactpage SET phone = $1 WHERE id = $2";

    await pool.query(
      contactTitle,

      [title, id]
    );

    await pool.query(
      contactDesc,

      [description, id]
    );

    await pool.query(
      contactEmail,

      [email, id]
    );

    await pool.query(
      contactPhone,

      [phone, id]
    );

    res.json("About page has been updated");
  } catch (err) {
    console.log(err.message);
  }
};

// Delete card
exports.deleteContactInfo = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM contactpage WHERE id = $1", [id]);
    res.json("Contact Info has been deleted");
  } catch (err) {
    console.log(err.message);
  }
};
