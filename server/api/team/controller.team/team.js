const { Team } = require('../../../models');
const response = require('../../../util/response');
const findTeamByTeamName = require('../service.team/findTeamByTeamName');
const findUserById = require('../service.team/findUserByUserId.js');

const createTeam = async (req, res) => {
    const { name , leaderId } = req.body;    
    try {

        const checkExistUser = await findUserById(leaderId);

        if(checkExistUser === false) { // 유저 존재 여부 체크
            return response(res, 500, '유저가 존재하지 않아 팀을 생성할 수 없습니다.');   
        }

        const existedTeam = await findTeamByTeamName(name);

        if(existedTeam) { // 중복 팀명 체크
            return response(res, 500, '중복된 팀명은 생성할 수 없습니다.');
        }

        const team = await Team.create({
            name : name,
            leaderId : leaderId
        });

        return response(res, 200, team);

    } catch (err) {
        console.error(err);
        return response(res, 500, '팀 생성 실패');
    }
};

module.exports = {
    createTeam
};