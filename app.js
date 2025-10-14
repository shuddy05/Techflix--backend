require("dotenv").config(); // impprt .env and also config it

const express = require("express");

const mongoose = require("mongoose"); /// install mongoose to connect mongodb
//
const cors = require("cors");

const authRouter = require("./routes/authRouter"); // import router from Route folder
const movieRouter = require("./routes/movieRouter"); // import movie router
const bookmarkRouter = require("./routes/bookmarkRouter");
const app = express(); // started a server

const port = process.env.PORT || 1010;
// Middleware to convert all users information to a Json format (javascript object notation)
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/movie", movieRouter);
app.use("/api/bookmark", bookmarkRouter);

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("Database connected");

    await app.listen(port);
    console.log(`Server is running on PORT ${port}`);
  } catch (error) {
    console.error("Unable to connect to Database");
  }
};
start();

// horlabodehyibrahim_db_user
// TSQPkDfKcMsRcbqt
// mongodb+srv://horlabodehyibrahim_db_user:TSQPkDfKcMsRcbqt@cluster0.wrmygkd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
