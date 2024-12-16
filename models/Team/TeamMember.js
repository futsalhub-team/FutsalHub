module.exports = (sequelize, DataTypes) => {
    const TeamMember = sequelize.define(
        'TeamMember',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            teamId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            position: {
                type: DataTypes.STRING,
                allowNull: true,
            },
        },
        {
            tableName: 'team_members',
            timestamps: true,
        }
    );

    TeamMember.associate = (models) => {
        TeamMember.belongsTo(models.Team, { foreignKey: 'teamId', as: 'team' });
        TeamMember.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    };

    return TeamMember;
};
