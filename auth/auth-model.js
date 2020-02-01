const db = require("../database/dbConfig");

async function add(user) {
  const [id] = await db("users").insert(user);

  return findBy({id});
}

function findBy(filter) {
  return db("users")
    .where(filter)
    .first();
}

module.exports = {
  add,
  findBy,
};
