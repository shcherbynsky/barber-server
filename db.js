const { Sequelize } = require("sequelize");

module.exports = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  // {
  //     dialect: 'postgres',
  //     host: ec2-54-84-182-168.compute-1.amazonaws.com,
  //     port: 5432,
  // }
  {
    dialect: "postgres",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
 
    dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
    
    }
  }
);
