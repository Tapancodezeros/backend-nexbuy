import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database.js';

interface ProductAttributes {
    id: number;
    title: string;
    description?: string;
    price: number;
    stock: number;
    category?: string; 
}

interface ProductCreationAttributes extends Optional<ProductAttributes, 'id' | 'description' | 'category'> {}

class Product extends Model<ProductAttributes, ProductCreationAttributes> implements ProductAttributes {
    public id!: number;
    public title!: string;
    public description?: string;
    public price!: number;
    public stock!: number;
    public category?: string;

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
}, {
    sequelize,
    tableName: 'products',
});

export { Product };