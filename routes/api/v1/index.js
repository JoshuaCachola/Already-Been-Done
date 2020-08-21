const router = require("express").Router();

const routes = ["skaters", "skatespots", "skateposts", "chatrooms"];

router.get("/", (_, res) => {
  res.status(200).end();
});

for (let route of routes) {
  router.use(`/${route}`, require(`./${route}`));
}

module.exports = router;
