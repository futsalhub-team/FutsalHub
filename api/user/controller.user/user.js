const { User } = require('../../../models');
const response = require('../../../util/response');

const readUserDetail = async (req, res) => {
    const { id } = req.body;
    try {
        const user = await User.findOne({
            where: { id }
        });
        if (!user) {
            return response(res, 500, '유저가 존재하지 않습니다.');
        }
        return response(res, 200, user);
    } catch (err) {
        console.error(err);
        return response(res, 500, '유저 조회 실패');
    }
}

const deleteUser = async (req, res) => {
    const { id } = req.body;
    try {
        const user = await User.findOne({
            where: { id }
        });
        if (!user) {
            return response(res, 500, '유저가 존재하지 않습니다.');
        }
        await User.destroy({
            where: { id }
        });
        return response(res, 200, '유저 삭제 성공');
    }
    catch (err) {
        console.error(err);
        return response(res, 500, '유저 삭제 실패');
    }
}

module.exports = {
    readUserDetail, deleteUser
}