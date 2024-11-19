
module.exports = {
    HOST:"localhost",
    USER:"postgres",
    PASSWORD:"1500",
    DB: "test",
    PORT:5432,
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };     

  
