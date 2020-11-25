const { MongoClient } = require("salvage.db");
const db = new MongoClient({
  mongoURI: require("./env").Mongo,
  schema: {
    name: "Arthur🐱🐱🐱ᵇᵈᵐ",
  },
});
module.exports = db;