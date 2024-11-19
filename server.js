const express = require("express");
const cors = require("cors");
require('dotenv').config();

const app = express();
const { DataTypes } = require('sequelize');

var corsOptions = {
  origin: ["http://localhost:3000" ]
};

var path = require('path')


app.use(cors(corsOptions));
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
const db = require("./app/models");
db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });


app.get("/", (req, res) => {
  res.json({ message: "Welcome Investormodel" });
});


require("./app/routes/auth.routes")(app)
require("./app/routes/category.routes")(app)
const PORT = process.env.PORT ||8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});



