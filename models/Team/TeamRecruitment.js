module.exports = (sequelize, DataTypes) => {
    const TeamRecruitment = sequelize.define(
        'TeamRecruitment',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            content: {
                type: DataTypes.STRING,
                allowNull: true,
            },
        },
        {
            tableName: 'team_recruitments', // 적절한 테이블 이름으로 수정
            timestamps: true,
        }
    );

    TeamRecruitment.associate = (models) => {
        TeamRecruitment.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    };

    return TeamRecruitment;
};
