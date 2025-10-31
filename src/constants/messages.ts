export const STATUS = {
    SUCCESS: 'success',
    ERROR: 'error',
};

export const HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
};

export const MESSAGES = {
    // Server and Database
    SERVER_RUNNING: (port: number) => `🚀 Server running on http://localhost:${port}`,
    API_WELCOME: 'Welcome to the NexBuy API. Database is connected.',
    DB_CONNECTION_SUCCESS: '✅ PostgreSQL connection has been established successfully.',
    DB_CONNECTION_ERROR: '❌ Unable to connect to the database:',
    DB_SYNC_SUCCESS: '✅ All models were synchronized successfully.',
    DB_SYNC_ERROR: '❌ Could not sync models with the database:',

    // Seeding
    SEED_ALREADY_DONE: '✅ Database already contains sufficient seed data.',
    SEED_STARTING: '🌱 Seeding database with new records...',
    SEED_USERS_SUCCESS: (count: number) => `🌱 Seeded ${count} users.`,
    SEED_PRODUCTS_SUCCESS: (count: number) => `🌱 Seeded ${count} products.`,
    SEED_SHOPS_SUCCESS: (count: number) => `🌱 Seeded ${count} shops.`,
    SEED_COMPLETE: '✅ Database seeding completed successfully.',
    SEED_ERROR: '❌ Error seeding the database:',

    // Generic Errors
    INTERNAL_SERVER_ERROR: 'Internal server error.',
    INVALID_ID_FORMAT: (resource: string) => `Invalid ${resource} ID format.`,
    NOT_FOUND: (resource: string, id: number) => `${resource} with ID ${id} not found.`,
    MISSING_FIELDS: (fields: string) => `Missing required fields (${fields}).`,

    // User Messages
    USER: {
        CREATED: 'User created successfully.',
        UPDATED: (id: number) => `User ${id} updated successfully.`,
        DELETED: (id: number) => `User ${id} deleted successfully.`,
        NOT_FOUND: (id: number) => `User with ID ${id} not found.`,
        MISSING_FIELDS: 'Missing required fields (firstName, lastName).',
        MISSING_CREDENTIALS: 'Email and password are required.',
        INVALID_CREDENTIALS_LOGIN: 'Invalid email or password.',
        INVALID_ID: 'Invalid user ID format.',
    },

    // Product Messages
    PRODUCT: {
        CREATED: 'Product created successfully.',
        UPDATED: (id: number) => `Product ${id} updated successfully.`,
        DELETED: (id: number) => `Product ${id} deleted successfully.`,
        NOT_FOUND: (id: number) => `Product with ID ${id} not found.`,
        MISSING_FIELDS: 'Missing required fields (title, price).',
        INVALID_ID: 'Invalid product ID format.',
    },

    // Shop Messages
    SHOP: {
        CREATED: 'Shop created successfully.',
        UPDATED: (id: number) => `Shop ${id} updated successfully.`,
        DELETED: (id: number) => `Shop with ID ${id} deleted successfully.`,
        NOT_FOUND: (id: number) => `Shop with ID ${id} not found.`,
        MISSING_FIELDS: 'Missing required fields (name, ownerId).',
        INVALID_ID: 'Invalid shop ID format.',
    },
};