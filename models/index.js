'use strict';

require('dotenv').config();
const Sequelize = require('sequelize');
const db = {};

const config = {
    username: process.env.DB_USER,
    password: process.env.DB_PASW,
    database: process.env.DB_BASE,
    host: process.env.DB_HOST,
    dialect: 'mysql',
    timezone: '+09:00',
    dialectOptions: {
        charset: 'utf8mb4',
        dateStrings: true,
        typeCast: true,
    },
    define: {
        freezeTableName: true, // 테이블 이름을 모델명 그대로 사용
        timestamps: true,
        paranoid: true, // 삭제 시 soft delete 사용
    },
};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

// 모델 로드
db.User = require('./User/User')(sequelize, Sequelize);
db.Team = require('./Team/Team')(sequelize, Sequelize);
db.TeamMember = require('./Team/TeamMember')(sequelize, Sequelize);
db.TeamRecruitment = require('./Team/TeamRecruitment')(sequelize, Sequelize);

// 관계 설정
Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
