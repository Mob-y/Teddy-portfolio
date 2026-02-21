// app.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const pagesRoutes = require("./routes/pages.routes");
const questsRoutes = require("./routes/quests.routes");
const easterEggRoutes = require("./routes/easterEggs.routes");
const contactRoutes = require("./routes/contact.routes");

const app = express();

app.use(cors());

app.use(express.json());

// Routes
app.use("/api/pages", pagesRoutes);
app.use("/api/quests", questsRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/easter-eggs", easterEggRoutes);

// Health check
app.get("/api/health", (_req, res) => {
	res.json({ status: "OK", message: "API is running" });
});

module.exports = app;
