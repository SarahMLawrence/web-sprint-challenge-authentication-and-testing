const db = require("../database/dbConfig");

function find() {
  return db("users");
}

async function add(user) {
  const [id] = await db("users").insert(user).select("username", "password");
  return findById(id);
}

function findBy(filter) {
return db("users").select("id", "username", "password").where(filter);
}

function findById(id) {
  return db("users").select("id", "username", "password").where({ id }).first();
}

module.exports = {
  find,
  add,
  findBy,
  findById,
};
