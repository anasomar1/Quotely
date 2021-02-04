const express = require("express");
const router = express.Router();
const {
  createPost,
  createPostPage,
} = require("../controllers/postsController");

router.get("/new", createPostPage);

router.post("/store", createPost);

module.exports = router;
