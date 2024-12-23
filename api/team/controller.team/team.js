const { Team , TeamMember} = require('../../../models');
const response = require('../../../util/response');
const findTeamByTeamName = require('../service.team/findTeamByTeamName.js');
const findUserByUserId = require('../service.team/findUserByUserId.js');
const findTeamByTeamId = require('../service.team/findTeamByTeamId.js');

const createTeam = async (req, res) => {
    const { name , leaderId } = req.body;    
    try {

        const checkExistUser = await findUserByUserId(leaderId);

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

const addMember = async (req, res) => {
    const { teamId, userId } = req.body;
    try {
        const team = await findTeamByTeamId(teamId);
        if(!team) {
            return response(res, 500, '팀이 존재하지 않습니다.');
        }

        const user = await findUserByUserId(userId);
        if(!user) {
            return response(res, 500, '유저가 존재하지 않습니다.');
        }

        const teamMember = await TeamMember.create({
            teamId : teamId,
            userId : userId
        });


        return response(res, 200, teamMember);
    }
    catch(err) {
        console.error(err);
        return response(res, 500, '팀원 추가 실패');
    }

}

const getTeamList = async (req, res) => {
    try {
        const teamList = await Team.findAll();
        return response(res, 200, teamList);
    } catch (err) {
        console.error(err);
        return response(res, 500, '팀 리스트 조회 실패');
    }
}

const getTeamDetail = async (req, res) => {
    const { teamId } = req.body;
    try {
        const team = await findTeamByTeamId(teamId);
        if(!team) {
            return response(res, 500, '팀이 존재하지 않습니다.');
        }

        return response(res, 200, team);
    } catch (err) {
        console.error(err);
        return response(res, 500, '팀 상세 조회 실패');
    }
}


module.exports = {
    createTeam, addMember, getTeamList , getTeamDetail
};