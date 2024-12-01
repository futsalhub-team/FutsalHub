module.exports = (sequelize, DataTypes) => {
    const Team = sequelize.define(
        'Team',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            leaderId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            tableName: 'teams',
            timestamps: true,
        }
    );

    Team.associate = (models) => {
        Team.belongsTo(models.User, { foreignKey: 'leaderId', as: 'leader' });
        Team.hasMany(models.TeamMember, { foreignKey: 'teamId', as: 'members' });
    };

    return Team;
};
