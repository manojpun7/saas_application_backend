import { Sequelize } from "sequelize-typescript";


import { config } from "dotenv";
config()


const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  dialect: "mysql",
  port: Number(process.env.DB_NAME),
  models:[__dirname+'/models']
});

sequelize
  .authenticate()
  .then(() => {
    console.log("connected successfully");
  })
  .catch((error) => {
    console.log(error);
  });

sequelize.sync({alter:false})
.then(()=>{
  console.log("migrated successfully!")
})

export default sequelize;
