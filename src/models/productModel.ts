import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database.js';
import { Shop } from './shopModel.js';

interface Rating {
    rate: number;
    count: number;
}

interface ProductAttributes {
    id: number;
    title: string;
    description?: string;
    price: number;
    stock: number;
    category?: string; 
    image: string;
    rating: Rating;
    shopId: number;
}

interface ProductCreationAttributes extends Optional<ProductAttributes, 'id' | 'description' | 'category'> {}

class Product extends Model<ProductAttributes, ProductCreationAttributes> implements ProductAttributes {
    public id!: number;
    public title!: string;
    public description?: string;
    public price!: number;
    public stock!: number;
    public category?: string;
    public image!: string;
    public rating!: Rating;
    public shopId!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Product.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    category: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isUrl: true,
        },
    },
    rating: {
        type: DataTypes.JSONB,
        allowNull: false,
        validate: {
            isRatingValid(value: Rating) {
                if (value && (value.rate <= 0 || value.rate > 5)) {
                    throw new Error('Rating must be greater than 0 and less than or equal to 5.');
                }
            }
        }
    },
    shopId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Shop,
            key: 'id',
        }
    },
}, {
    sequelize,
    tableName: 'products',
});

export { Product };