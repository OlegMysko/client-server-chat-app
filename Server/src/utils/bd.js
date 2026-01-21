import {Sequelize} from 'sequelize'
import 'dotenv/config';
export const client = process.env.DATABASE_URL ?
  new Sequelize(process.env.DATABASE_URL,{
    dialect: 'postgres',
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
}): new Sequelize({
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  dialect: 'postgres',
  port: process.env.DB_PORT || 5432,
})
