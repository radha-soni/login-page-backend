const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB conn. success");
});

const loginRouter = require("./routes/login");
const registerRouter = require("./routes/register");
const adminRouter = require("./routes/admin");
const removeAdminRouter = require("./routes/removeAdmin.js");

app.use("/login", loginRouter);
app.use("/register", registerRouter);
app.use("/admin/add", adminRouter);
app.use("/admin/remove", removeAdminRouter);

app.listen(port, () => {
  console.log("Server is running : " + port);
});
