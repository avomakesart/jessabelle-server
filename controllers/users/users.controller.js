const pool = require("../../config/projects.config");
const bcrypt = require('bcryptjs')
// Post HOME info
// Get the cta info
exports.getUsers = async (req, res) => {
  try {
    const newEntry = await pool.query("SELECT * FROM users");
    res.json(newEntry.rows);
  } catch (err) {
    console.log(err.message);
  }
};

// Get the cta info by id
exports.getUsersById = async (req, res) => {
  try {
    const { id } = req.params;
    const navbar = await pool.query("SELECT * FROM users WHERE id = $1", [id]);

    res.json(navbar.rows);
  } catch (err) {
    console.log(err.message);
  }
};

// Update cta
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { fullname, username, email } = req.body;

    let fullName = "UPDATE users SET fullname = $1 WHERE id = $2";

    let userName = "UPDATE users SET username = $1 WHERE id = $2";

    let userEmail = "UPDATE users SET email = $1 WHERE id = $2";

    let userPassword = "UPDATE users SET password = $1 WHERE id = $2";

    await pool.query(
      fullName,

      [fullname, id]
    );

    await pool.query(userName, [username, id]);

    await pool.query(
      userEmail,

      [email, id]
    );

    await pool.query(
      userPassword,

      [bcrypt.hashSync(req.body.password, 8), id]
    );

    res.json("User info has been updated");
  } catch (err) {
    console.log(err.message);
  }
};

// Delete cta
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM users WHERE id = $1", [id]);
    res.json("User has been deleted");
  } catch (err) {
    console.log(err.message);
  }
};
