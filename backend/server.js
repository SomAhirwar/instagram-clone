const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const postRouter = require("./routers/postRoutes");
const userRouter = require("./routers/userRoutes");
const path = require("path");
const dotenv = require("dotenv");

//Configuration
dotenv.config({ path: "./config.env" });
const app = express();
const DB = process.env.DATABASE_LOCAL;
const port = process.env.PORT * 1 || 8080;
const server = http.createServer(app);

//Middleware
app.use(express.json());
app.use(cors());

//Routes
app.use("/posts", postRouter);
app.use("/user", userRouter);
app.use("/public", express.static(path.join(__dirname, "public")));
// app.use(express.static(`${__dirname}/public`));

//////////////////////
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connection successful!");
  })
  .catch((err) => console.log(err));

server.listen(port, () => {
  console.log(`App server is Running on port ${port}`);
});
