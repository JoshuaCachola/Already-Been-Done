const router = require("express").Router();

const routes = ["skaters", "skatespots"];

for (let route of routes) {
  router.use(`/${route}`, require(`./${route}`));
}

module.exports = router;