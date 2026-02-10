const express = require("express");
const router = express.Router();

const {
	getHomePage,
	getAboutPage,
	getProjectsPage,
} = require("../controllers/pages.controller");

router.get("/home", getHomePage);
router.get("/about", getAboutPage);
router.get("/projects", getProjectsPage);

module.exports = router;
