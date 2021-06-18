const Sequelize = require("sequelize");

const db = new Sequelize(process.env.DATABASE_URL || "postgres://eric:0611@localhost:5432/messenger", {
  logging: false
});

db.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error: ', err))

module.exports = db;
