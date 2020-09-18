const pool = require("../../config/projects.config");

// Post HOME info
exports.createSelectedWork = async (req, res) => {
  try {
    const { image, title, description } = req.body;

    const workImage = image;
    const workTitle = title;
    const workDescription = description;

    const newEntry = await pool.query(
      "INSERT INTO selected_work (image, title, description) VALUES($1, $2, $3) RETURNING *",
      [workHeadline, workImage, workTitle, workDescription]
    );

    res.json(newEntry);
  } catch (err) {
    console.log(err.message);
  }
};

// Get the cta info
exports.getSelectedWork = async (req, res) => {
  try {
    const newEntry = await pool.query("SELECT * FROM selected_work");
    res.json(newEntry.rows);
  } catch (err) {
    console.log(err.message);
  }
};

// Get the cta info by id
exports.getSelectedWorkById = async (req, res) => {
  try {
    const { id } = req.params;
    const home = await pool.query("SELECT * FROM selected_work WHERE id = $1", [
      id,
    ]);

    res.json(home);
  } catch (err) {
    console.log(err.message);
  }
};

// Update cta
exports.updateSelectedWork = async (req, res) => {
  try {
    const { id } = req.params;
    const { image, title, description } = req.body;

    let workImage = "UPDATE selected_work SET image = $1 WHERE id = $2";

    let workTitle = "UPDATE selected_work SET title = $1 WHERE id = $2";

    let workDescription =
      "UPDATE selected_work SET description = $1 WHERE id = $2";

    await pool.query(
      workImage,

      [image, id]
    );

    await pool.query(
      workTitle,

      [title, id]
    );

    await pool.query(
      workDescription,

      [description, id]
    );

    res.json("Work content has been updated");
  } catch (err) {
    console.log(err.message);
  }
};

// Delete cta
exports.deleteSelectedWork = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM selected_work WHERE id = $1", [id]);
    res.json("Work content has been deleted");
  } catch (err) {
    console.log(err.message);
  }
};
