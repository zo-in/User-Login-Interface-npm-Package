require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

function createAuthApp({ mongoURI, routePrefix = "/api" }) {
  const app = express();
  app.use(cors());
  app.use(express.json());

  app.use(`${routePrefix}/auth`, authRoutes);
  app.use(`${routePrefix}/users`, userRoutes);

  mongoose
    .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("MongoDB connection error:", err));

  return app;
}

module.exports = createAuthApp;
