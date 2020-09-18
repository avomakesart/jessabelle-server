const pool = require('../../config/projects.config')
const moment = require('moment')

// Post comment
exports.createPostComment = async (req, res) => {
  try {
    const { id } = req.params

    const {
      title,
      comment,
      createdat = moment().format(),
      publishedat = moment().format(),
    } = req.body

    const createdDate = createdat
    const publishedDate = publishedat
    const commentTitle = title
    const comments = comment

    const newEntry = await pool.query(
      'INSERT INTO comments (post_id, title, comment, createdat, publishedat) VALUES($1, $2, $3, $4, $5) RETURNING *',
      [id, commentTitle, comments, createdDate, publishedDate]
    )

    res.json(newEntry.rows[0])
  } catch (err) {
    console.log(err.message)
  }
}

// Get comments by Id
exports.getPostComments = async (req, res) => {
  try {
    const { id } = req.params
    const newEntry = await pool.query('SELECT * FROM comments WHERE id = $1', [id])
    res.json(newEntry.rows)
  } catch (err) {
    console.log(err.message)
  }
}

// Get comments by post Id
exports.getPostCommentById = async (req, res) => {
  try {
    const { id } = req.params
    const values = await pool.query(
      'SELECT * FROM comments WHERE post_id = $1',
      [id]
    )
    res.json(values.rows)
  } catch (err) {
    console.log(err.message)
  }
}

// DELETE post comment
exports.deletePostComment = async (req, res) => {
  try {
    const { id } = req.params
    await pool.query('DELETE FROM comments WHERE id = $1', [id])
    res.json('Comment has been deleted')
  } catch (err) {
    console.log(err.message)
  }
}
