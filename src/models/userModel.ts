
import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database.js';
import bcrypt from 'bcryptjs'; 

interface UserAttributes {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string; 
    gender: string;
    image: string;
    age?: number;
    refreshToken?: string;
} 
interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'age' | 'refreshToken'> {}

// 2. Update Model class
class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: number;
    public username!: string;
    public firstName!: string;
    public lastName!: string;
    public email!: string;
    public password!: string; 
    public gender!: string;
    public image!: string;
    public age?: number;
    public refreshToken?: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public async correctPassword(candidatePassword: string): Promise<boolean> {
        return await bcrypt.compare(candidatePassword, this.password);
    }
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
    },
    firstName: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    password: { 
        type: DataTypes.STRING, 
        allowNull: false,
    },
    gender: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    refreshToken: {
        type: DataTypes.STRING,
        allowNull: true, 
    },
}, {
    sequelize,
    tableName: 'users',
    hooks: {
        beforeCreate: async (user: User) => {
            if (user.password) {
                user.password = await bcrypt.hash(user.password, 12);
            }
        },
        beforeUpdate: async (user: User) => {
            if (user.changed('password')) { 
                user.password = await bcrypt.hash(user.password, 12);
            }
        },
    }
});

export { User };