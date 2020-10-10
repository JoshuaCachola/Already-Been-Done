// const { Client } = require("@elastic/elasticsearch");
// require("dotenv").config();

// const elasticUrl = process.env.ELASTIC_URL || "http://localhost:9200";
// const esClient = new Client({ node: elasticUrl });
// //const index = ;
// //const type = ;

// // create index
// const createIndex = async (index) => {
//   try {
//     await esClient.indices.create({ index });
//     console.log(`Created index ${index}`);
//   } catch (err) {
//     console.log("An error happened when creating an index");
//     console.error(err);
//   }
// };

// // create mapping for index
// // const setIndexMapping = async () => {
// //   try {
// //     const schema = {};
// //   }
// // };

const elasticsearch = require("elasticsearch");

const client = new elasticsearch.Client({
  hosts: ["http://localhost:9200"],
});

module.exports = client;
