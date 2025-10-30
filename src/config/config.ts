// /home/codezeros/backend-nexbuy/src/config/config.ts

import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// A utility function to convert the port from a string to a number
const getPort = (port: string | undefined): number => {
  if (port === undefined) {
    return 5432; // Default port
  }
  const parsedPort = parseInt(port, 10);
  return isNaN(parsedPort) ? 5432 : parsedPort;
};

/**
 * Interface defining the structure of the database configuration.
 */
interface DatabaseConfig {
  name: string;
  user: string;
  password: string;
  host: string;
  port: number;
}

/**
 * The configuration object loaded from environment variables.
 */
export const dbConfig: DatabaseConfig = {
  // Use the defaults if the environment variables are not set
  name: process.env.DB_NAME || 'nexbuy_db',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'your_default_password',
  host: process.env.DB_HOST || 'localhost',
  port: getPort(process.env.DB_PORT),
};
