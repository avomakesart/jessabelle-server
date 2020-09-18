const pool = require("../../config/projects.config");

// Post card
exports.createMessage = async (req, res) => {
  try {
    const { name, last_name, email, subject, message } = req.body;

    const newEntry = await pool.query(
      "INSERT INTO messages (name, last_name, email, subject, message) VALUES($1, $2, $3, $4, $5) RETURNING *",
      [name, last_name, email, subject, message]
    );

    res.json(newEntry);
  } catch (err) {
    console.log(err.message);
  }
};

// Get the cards
exports.getMessage = async (req, res) => {
  try {
    const newEntry = await pool.query("SELECT * FROM messages");
    res.json(newEntry.rows);
  } catch (err) {
    console.log(err.message);
  }
};

// Get the card by ID
exports.getMessageById = async (req, res) => {
  try {
    const { id } = req.params;
    const about = await pool.query("SELECT * FROM messages WHERE id = $1", [
      id,
    ]);

    res.json(about.rows);
  } catch (err) {
    console.log(err.message);
  }
};

exports.deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM messages WHERE id = $1", [id]);
    res.json("Message info has been deleted");
  } catch (err) {
    console.log(err.message);
  }
};
