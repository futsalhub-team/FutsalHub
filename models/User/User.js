module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        'User',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            loginId: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            nickname: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            preferredPosition: {
                type: DataTypes.STRING,
                allowNull: true,
            },
        },
        {
            tableName: 'users',
            timestamps: true,
        }
    );

    User.associate = (models) => {
        User.hasMany(models.Team, { foreignKey: 'leaderId', as: 'teams' });
    };

    return User;
};
