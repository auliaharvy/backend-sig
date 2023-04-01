module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        fullname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // role:{
        //     type: DataTypes.ENUM,
        //     values: ['admin', 'student'],
        //     allowNull: false,
        //     defaultValue: 'student'
        // },
        // avatar:{
        //     type: DataTypes.STRING,
        //     allowNull: true,
        // },
        isDelted:{
            field: 'is_deleted',
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        createdAt: {
            field: 'created_at',
            type: DataTypes.DATE,
            allowNull: false,
        },
        updatedAt: {
            field: 'updated_at',
            type: DataTypes.DATE,
            allowNull: true,
        }
    }, {
        tableName: 'users',
        timestamps: true,
    });

    return User;
}