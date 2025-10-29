// config/database.ts
import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';
dotenv.config();
const dbName = process.env.DB_NAME || 'nexbuy_db';
const dbUser = process.env.DB_USER || 'postgres';
const dbHost = process.env.DB_HOST || 'localhost';
const dbPassword = process.env.DB_PASSWORD || 'your_default_password';

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    dialect: 'postgres',
    logging: false, 
    define: {
        freezeTableName: true
    }
});

async function connectDB() {
    try {
        await sequelize.authenticate();
        console.log('✅ PostgreSQL connection has been established successfully.');
    } catch (error) {
        console.error('❌ Unable to connect to the database:', error);

        process.exit(1); 
    }
}

async function syncModels() {
    await sequelize.sync({ alter: true }); 
    console.log('✅ All models were synchronized successfully.');
}
export { sequelize, connectDB, syncModels };