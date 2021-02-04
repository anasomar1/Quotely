const express = require("express");
const router = express.Router();
const BlogPost = require("../models/BlogPost");

router.get("/:id", async (req, res) => {
  const blogpost = await BlogPost.findById(req.params.id);
  res.render("post", { blogpost });
});

module.exports = router;
