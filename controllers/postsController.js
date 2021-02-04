const BlogPost = require("../models/BlogPost");
const path = require("path");

exports.createPost = (req, res) => {
  let image = req.files.image;
  image
    .mv(path.resolve(__dirname, "..", "public/img", image.name))
    .then(() => console.log("image moved"))
    .catch((err) => console.log(err));

  BlogPost.create({
    title: req.body.title,
    username: req.body.name,
    body: req.body.content,
    image: "/img/" + image.name,
  });
  res.redirect("/");
};

exports.createPostPage = (req, res) => {
  if (req.session.userId) {
    res.render("create");
  } else {
    res.redirect("/users/login");
  }
};
