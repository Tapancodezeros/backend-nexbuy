import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database.js';
import { User } from './userModel.js';

interface ShopAttributes {
    id: number;
    name: string;
    ownerId: number;
}

interface ShopCreationAttributes extends Optional<ShopAttributes, 'id'> {}

class Shop extends Model<ShopAttributes, ShopCreationAttributes> implements ShopAttributes {
    public id!: number;
    public name!: string;
    public ownerId!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Shop.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: true,
    },
    ownerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        }
    }
}, {
    sequelize,
    tableName: 'shops',
});

export { Shop };
