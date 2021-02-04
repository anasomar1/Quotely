const express = require("express");
const BlogPost = require("../models/BlogPost");

const router = express.Router();

router.get("/", async (req, res) => {
  const blogposts = await BlogPost.find({});
  console.log(req.session);
  res.render("index", { blogposts });
});

module.exports = router;
