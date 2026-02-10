const { getPageData } = require("../services/pages.service");

const sendPage = (res, data) => {
  if (!data) {
    return res.status(404).json({ error: "Page not found" });
  }
  res.json(data);
};

const getHomePage = (_req, res) => {
  sendPage(res, getPageData("home"));
};

const getAboutPage = (_req, res) => {
  sendPage(res, getPageData("about"));
};

const getProjectsPage = (_req, res) => {
  sendPage(res, getPageData("projects"));
};

module.exports = {
  getHomePage,
  getAboutPage,
  getProjectsPage,
};
