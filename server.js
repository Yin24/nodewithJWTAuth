const express = require("express");
const mongoose = require("mongoose");
const blogRouters = require("./routes/blogRoutes");
const bookRouters = require("./routes/bookRoutes");
const userRouters = require("./routes/userRoutes");
const path = require("path");
require("dotenv").config();
const cors = require("cors");
const helmet =require("helmet");
//
const morgan = require("morgan");
const blogLimitter = require("express-rate-limit");

const app = express();

app.use(express.json());
app.use("/upload", express.static(path.join(__dirname, "upload")));
app.use(cors( {
  origin: "http://localhost:3000",
  method: ["GET", "PUT"],
})
);
app.use(helmet());
app.use(morgan("tiny"));


app.get("/", (req, res) => {
  res.send("Here is ur server");
});

app.use("/users", userRouters);
app.use("/books", bookRouters);
app.use("/blogs", blogRouters);



mongoose.connect("mongodb://localhost:27017/auth").then(() => {
  console.log("db connected");
  app.listen(4000, () => {
    console.log("Server is up and running");
  });
});