const express = require("express");
const helmet = require("helmet");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const expressSession = require("express-session");
require("dotenv").config();

//Importing Routers
const mainRouter = require("./routes/mainRoute");
const postRouter = require("./routes/postRoute");
const postsRouter = require("./routes/postsRoute");
const userRouter = require("./routes/userRouter");

//Importing middleware
const validationMiddleware = require("./middleware/validationMiddleware");
const authMiddleware = require("./middleware/authMiddleware");
const redirectLoggedInMiddleware = require("./middleware/redirectIfAuthenticatedMiddleware");
//Starting app
const app = express();
app.use(helmet());
app.set("view engine", "ejs");

//Middleware
app.use(
  expressSession({
    secret: "No one can guess this I guess",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(validationMiddleware);
app.use(fileUpload());

//Middleware
app.use("/posts/store", validationMiddleware);
app.use("/posts/new", authMiddleware);
app.use("/users/login", redirectLoggedInMiddleware);
app.use("/users/register", redirectLoggedInMiddleware);

//Global Variable
global.loggedIn = null;

app.use("*", (req, res, next) => {
  loggedIn = req.session.userId;
  next();
});

//Router Middleware
app.use("/", mainRouter);
app.use("/post", postRouter);
app.use("/posts/", postsRouter);
app.use("/users", userRouter);
app.use((req, res) => res.render("notfound"));

mongoose
  .connect(process.env.MONGO_SERVER, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((error) => console.log(error));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
