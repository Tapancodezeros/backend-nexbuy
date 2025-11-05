import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database.js';

interface ContactAttributes {
    id: number;
    fullName: string;
    email: string;
    message: string;
}

interface ContactCreationAttributes extends Optional<ContactAttributes, 'id'> {}

class Contact extends Model<ContactAttributes, ContactCreationAttributes> implements ContactAttributes {
    public id!: number;
    public fullName!: string;
    public email!: string;
    public message!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Contact.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    fullName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
}, {
    sequelize,
    tableName: 'contacts',
});

export { Contact };
