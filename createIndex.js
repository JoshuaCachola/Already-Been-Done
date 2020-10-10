const client = require("./connection");

client.indices.create(
  {
    index: "skatespots",
    // body: {
    //   mappings: {
    //     properties: {
    //       id: { type: "integer" },
    //       username: { type: "text" },
    //     },
    //   },
    // },
  },
  (err, res, status) => {
    if (err) {
      console.error(err);
    } else {
      console.log("Create index response: ", res);
    }
  }
);

client.indices.create(
  {
    index: "skaters",
    // body: {
    //   mappings: {
    //     properties: {
    //       id: { type: "integer" },
    //       username: { type: "text" },
    //     },
    //   },
    // },
  },
  (err, res, status) => {
    if (err) {
      console.error(err);
    } else {
      console.log("Create index response: ", res);
    }
  }
);

// client.indices.create(
//   {
//     index: "skatecrews",
//   },
//   (err, res, status) => {
//     if (err) {
//       console.error(err);
//     } else {
//       console.log("Create index response: ", res);
//     }
//   }
// );
