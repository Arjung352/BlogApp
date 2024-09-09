const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const userApi = require("./route/userApi");
app.use(express.json());
require("dotenv").config();
app.use(cors());
app.use("/api", userApi);
app.get("/", (req, res) => {
  res.json({ message: "Hey There!" });
});
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Database Connected sucessfully");
    app.listen(process.env.PORT, () => {
      console.log(`Backend listning at port ${process.env.PORT}`);
    });
  })
  .catch(() => {
    console.log("error connecting to database");
  });
