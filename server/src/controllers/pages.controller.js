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

const getProjectsPage = (req, res) => {
  const data = getPageData("projects");

  if (!data) {
    return res.status(404).json({ error: "Page not found" });
  }

  if (req.query.mode === "debug") {
    return res.json({
      ...data,
      hiddenMessage: "👀 Tu explores l'API, j'aime ça.",
    });
  }

  res.json(data);
};


module.exports = {
  getHomePage,
  getAboutPage,
  getProjectsPage,
};
