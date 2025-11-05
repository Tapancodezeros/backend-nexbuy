import { Sequelize } from 'sequelize';

import { dbConfig } from './config.js';
import { MESSAGES } from '../constants/messages.js';
import { Contact } from '../models/contactModel.js';

const sequelize = new Sequelize(dbConfig.name, dbConfig.user, dbConfig.password, {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: 'postgres',
    logging: false, 
    define: {
        freezeTableName: true
    }
});

async function connectDB() {
    try {
        await sequelize.authenticate();
        console.log(MESSAGES.DB_CONNECTION_SUCCESS);
    } catch (error) {
        console.error(MESSAGES.DB_CONNECTION_ERROR, error);

        process.exit(1); 
    }
}

async function syncModels() {
    try {
        await sequelize.sync({ alter: true });
        console.log(MESSAGES.DB_SYNC_SUCCESS);
    } catch (error) {
        console.error(MESSAGES.DB_SYNC_ERROR, error);
        process.exit(1);
    }
}

export { sequelize, connectDB, syncModels };