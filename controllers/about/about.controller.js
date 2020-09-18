const pool = require("../../config/projects.config");

// Post card
exports.createAboutPage = async (req, res) => {
  try {
    const {
      content,
      social_title
    } = req.body;

    const aboutContent = content;
    const socialTitle = social_title;

    const newEntry = await pool.query(
      "INSERT INTO aboutpage (content, social_title) VALUES($1, $2) RETURNING *",
      [aboutContent, socialTitle]
    );

    res.json(newEntry);
  } catch (err) {
    console.log(err.message);
  }
};

// Get the cards
exports.getAboutPage = async (req, res) => {
  try {
    const newEntry = await pool.query('SELECT * FROM aboutpage')
    res.json(newEntry.rows)
  } catch (err) {
    console.log(err.message)
  }
}

// Get the card by ID
exports.getAboutPageById = async (req, res) => {
  try {
    const { id } = req.params
    const about = await pool.query("SELECT * FROM aboutpage WHERE id = $1", [id]);

    res.json(about.rows)
  } catch (err) {
    console.log(err.message)
  }
}

// Update a card
exports.updateAboutPage = async (req, res) => {
  try {
    const { id } = req.params
    const {
      content,
      social_title
    } = req.body

    let aboutContent = 'UPDATE aboutpage SET content = $1 WHERE id = $2';

    let socialTitle = 'UPDATE aboutpage SET social_title = $1 WHERE id = $2';

    await pool.query(
      aboutContent,

      [content, id]
    )

    await pool.query(
      socialTitle,

      [social_title, id]
    )

    res.json('About page has been updated')
  } catch (err) {
    console.log(err.message)
  }
}

// Delete card
exports.deleteAboutPage = async (req, res) => {
  try {
    const { id } = req.params
    await pool.query("DELETE FROM aboutpage WHERE id = $1", [id]);
    res.json('About page Info has been deleted')
  } catch (err) {
    console.log(err.message)
  }
}
