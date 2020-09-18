const pool = require("../../config/projects.config");
const moment = require("moment");

// Post blog post
exports.createPost = async (req, res) => {
  try {
    const { id } = req.params;
    // const { authorid } = req.params
    // const { parentid } = req.params
    const {
      authorid = 1,
      author_name = "Jessica Gardea",
      parentid = id,
      title,
      meta_title,
      slug,
      summary,
      published = true,
      createdat = moment(),
      updatedat = moment(),
      publishedat = moment(),
      content,
      read_time,
      featured_image,
    } = req.body;


    const authorID = authorid;
    const authorName = author_name;
    const metaTitle = meta_title;
    const publishedContent = published;
    const createdDate = createdat;
    const updated = updatedat;
    const publishedAt = publishedat;
    const parentId = parentid;

    const newEntry = await pool.query(
      "INSERT INTO post (parentid, authorid, author_name, title, meta_title, slug, summary, published, createdat, updatedat, publishedat, content, read_time, featured_image) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *",
      [
        parentId,
        authorID,
        authorName,
        req.body.title,
        req.body.meta_title,
        req.body.slug,
        req.body.summary,
        publishedContent,
        createdDate,
        updated,
        publishedAt,
        req.body.content,
        req.body.read_time,
        req.body.featured_image,
      ]
    );

    res.json(newEntry.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
};

// Get all post
exports.getPosts = async (req, res) => {
  try {
    const newEntry = await pool.query("SELECT * FROM post");
    res.json(newEntry.rows);
  } catch (err) {
    console.log(err.message);
  }
};

// Get a post by id
exports.getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const values = await pool.query("SELECT * FROM post WHERE id = $1", [id]);
    // const comments = await pool.query(
    //   'SELECT * FROM comments where post_id = $1',
    //   [id]
    // )
    res.json(values.rows);
    // res.json(comments.rows)
  } catch (err) {
    console.log(err.message);
  }
};

// Update a post
exports.updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      meta_title,
      slug,
      summary,
      published,
      createdat = moment(),
      updatedat = moment(),
      publishedat = moment(), 
      content,
      featured_image,
      read_time,
    } = req.body;

    let postTitle = "UPDATE post SET title = $1 WHERE id = $2";

    let metatitle = "UPDATE post SET meta_title = $1 WHERE id = $2";

    let postSlug = "UPDATE post SET slug = $1 WHERE id = $2";

    let postSummary = "UPDATE post SET summary = $1 WHERE id = $2";

    let publishedPost = "UPDATE post SET published = $1 WHERE id = $2";

    let createdAtPost = "UPDATE post SET createdat = $1 WHERE id = $2";

    let updatedAtPost = "UPDATE post SET updatedat = $1 WHERE id = $2";

    let publishedAtPost = "UPDATE post SET publishedat = $1 WHERE id = $2";

    let postContent = "UPDATE post SET content = $1 WHERE id = $2";

    let postImage = "UPDATE post SET featured_image = $1 WHERE id = $2";

    let readTime = "UPDATE post SET read_time = $1 WHERE id = $2";

    await pool.query(postTitle, [title, id]);

    await pool.query(metatitle, [meta_title, id]);

    await pool.query(postSlug, [slug, id]);

    await pool.query(postSummary, [summary, id]);

    await pool.query(publishedPost, [published, id]);

    await pool.query(createdAtPost, [createdat, id]);

    await pool.query(updatedAtPost, [updatedat, id]);

    await pool.query(publishedAtPost, [publishedat, id]);

    await pool.query(postContent, [content, id]);

    await pool.query(postImage, [featured_image, id]);

    await pool.query(readTime, [read_time, id]);

    res.json("Post has been updated");
  } catch (err) {
    console.log(err.message);
  }
};

// Delete a blog post
exports.deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM post WHERE id = $1", [id]);
    res.json("Post has been deleted");
  } catch (err) {
    console.log(err.message);
  }
};
