const router = require("express").Router();

const routes = ["skaters", "skatespots", "skateposts", "chat"];

router.get("/", (_, res) => {
  res.status(200).end();
});

for (let route of routes) {
  router.use(`/${route}`, require(`./${route}`));
}

module.exports = router;
