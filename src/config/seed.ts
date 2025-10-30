import { faker } from '@faker-js/faker';
import { User } from '../models/userModel.js';
import { Product } from '../models/productModel.js';
import { Shop } from '../models/shopModel.js';
import { MESSAGES } from '../constants/messages.js';

const USER_COUNT = 30;
const PRODUCT_COUNT = 30;
const SHOP_COUNT = 25;
export async function seedDatabase() {
    try {
        const userCount = await User.count();
        const productCount = await Product.count(); 
        const shopCount = await Shop.count();
        if (userCount >= USER_COUNT && productCount >= PRODUCT_COUNT && shopCount >= SHOP_COUNT) {
            console.log(MESSAGES.SEED_ALREADY_DONE);
            return;
        }
        console.log(MESSAGES.SEED_STARTING);
        const users = [];
        for (let i = 0; i < USER_COUNT; i++) {
            const firstName = faker.person.firstName();
            const lastName = faker.person.lastName();
            const gender = faker.person.sex();

            users.push({
                username: faker.internet.username({ firstName, lastName }),
                firstName,
                lastName,
                email: faker.internet.email({ firstName, lastName, provider: 'nexbuy.dev', allowSpecialCharacters: false }),
                password: faker.internet.password({ length: 10, memorable: true }),
                age: faker.number.int({ min: 18, max: 70 }),
                gender,
                image: faker.image.avatar(),
            });
        }
        await User.bulkCreate(users, { ignoreDuplicates: true });
        console.log(MESSAGES.SEED_USERS_SUCCESS(USER_COUNT));

        const products = [];
        for (let i = 0; i < PRODUCT_COUNT; i++) {
            products.push({
                title: faker.commerce.productName(),
                description: faker.commerce.productDescription(),
                price: parseFloat(faker.commerce.price()),
                stock: faker.number.int({ min: 0, max: 250 }),
                category: faker.commerce.department(),
                image: faker.image.url(),
                rating: {
                    rate: faker.number.float({ min: 1, max: 5, multipleOf: 0.1 }),
                    count: faker.number.int({ min: 0, max: 500 }),
                },
            });
        }
        await Product.bulkCreate(products, { ignoreDuplicates: true });
        console.log(MESSAGES.SEED_PRODUCTS_SUCCESS(PRODUCT_COUNT));
        const shops = [];
        const existingUsers = await User.findAll({ attributes: ['id'] });
        for (let i = 0; i < USER_COUNT / 2; i++) { 
            shops.push({
                name: faker.company.name() + ' Shop',
                description: faker.company.catchPhrase(),
                ownerId: existingUsers[i].id,
            });
        }
        await Shop.bulkCreate(shops, { ignoreDuplicates: true });
        console.log(MESSAGES.SEED_SHOPS_SUCCESS(await Shop.count()));
        console.log(MESSAGES.SEED_COMPLETE);
    } catch (error) {
        console.error(MESSAGES.SEED_ERROR, error);
    }
}
