module.exports = (req, res, next) => {
  if (
    req.files === null ||
    req.body.title === null ||
    req.body.content === null ||
    req.body.name === null
  ) {
    return res.redirect("/posts/new");
  }
  next();
};
