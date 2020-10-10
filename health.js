const client = require("./connection");

/* Get health status */
client.cluster.health({}, (err, res, status) => {
  console.log("-- Client Health --", res);
});
