const bcryptjs = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");

exports.seed = async function (knex) {

  await knex("users").del();

  const hashedPassword = await bcryptjs.hash("123Fred", 10);

  await knex("users").insert([
    {
      id: uuidv4(),
      name: "Fred",
      email: "fredx@sisloc.com.br",
      password: hashedPassword,
      created_at: knex.fn.now(),
    },
  ]);
};
