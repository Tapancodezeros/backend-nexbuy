
import * as dotenv from 'dotenv';

dotenv.config();

const getPort = (port: string | undefined): number => {
  if (port === undefined) {
    return 5432; // Default port
  }
  const parsedPort = parseInt(port, 10);
  return isNaN(parsedPort) ? 5432 : parsedPort;
};
interface DatabaseConfig {
  name: string;
  user: string;
  password: string;
  host: string;
  port: number;
}

export const dbConfig: DatabaseConfig = {
  // Use the defaults if the environment variables are not set
  name: process.env.DB_NAME || 'nexbuy_db',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'your_default_password',
  host: process.env.DB_HOST || 'localhost',
  port: getPort(process.env.DB_PORT),
};
