import { faker } from '@faker-js/faker';
import { User } from '../models/userModel.js';
import { Product } from '../models/productModel.js';
import { Shop } from '../models/shopModel.js';


const USER_COUNT = 30;
const PRODUCT_COUNT = 30;
const SHOP_COUNT = 15;
export async function seedDatabase() {
    try {
        // Check if data already exists to avoid re-seeding on every server start
        const userCount = await User.count();
        const productCount = await Product.count(); 
        const shopCount = await Shop.count();
        
        // Only seed if there isn't enough data
        if (userCount >= USER_COUNT && productCount >= PRODUCT_COUNT && shopCount >= SHOP_COUNT) {
            console.log('✅ Database already contains sufficient seed data.');
            return;
        }

        console.log('🌱 Seeding database with new records...');

        // --- Seed Users ---
        const users = [];
        for (let i = 0; i < USER_COUNT; i++) {
            const firstName = faker.person.firstName();
            const lastName = faker.person.lastName();
            const gender = faker.person.gender();

            users.push({
                username: faker.internet.username({ firstName, lastName }),
                firstName,
                lastName,
                email: faker.internet.email({ firstName, lastName, provider: 'nexbuy.dev', allowSpecialCharacters: false }),
                password: faker.internet.password({ length: 10, memorable: true }), // In a real app, passwords would be more complex
                age: faker.number.int({ min: 18, max: 70 }),
                gender,
                image: faker.image.avatar(),
            });
        }
        // Using ignoreDuplicates to prevent errors if some records (like emails) conflict
        await User.bulkCreate(users, { ignoreDuplicates: true });
        console.log(`🌱 Seeded ${USER_COUNT} users.`);

        // --- Seed Products ---
        const products = [];
        for (let i = 0; i < PRODUCT_COUNT; i++) {
            products.push({
                title: faker.commerce.productName(),
                description: faker.commerce.productDescription(),
                price: parseFloat(faker.commerce.price()),
                stock: faker.number.int({ min: 0, max: 250 }),
                category: faker.commerce.department(),
            });
        }
        await Product.bulkCreate(products, { ignoreDuplicates: true });
        console.log(`🌱 Seeded ${PRODUCT_COUNT} products.`);

        // --- Seed Shops ---
        const shops = [];
        // Ensure there are enough users to assign as shop owners
        const existingUsers = await User.findAll({ attributes: ['id'] });
        for (let i = 0; i < USER_COUNT / 2; i++) { // Create shops for half the users
            shops.push({
                name: faker.company.name() + ' Shop',
                ownerId: existingUsers[i].id,
            });
        }
        await Shop.bulkCreate(shops, { ignoreDuplicates: true });
        console.log(`🌱 Seeded ${Shop.count} shops.`);

        console.log('✅ Database seeding completed successfully.');

    } catch (error) {
        console.error('❌ Error seeding the database:', error);
    }
}
