const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BlogPostSchema = new Schema(
  {
    title: String,
    body: String,
    username: String,
    image: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("BlogPost", BlogPostSchema);
