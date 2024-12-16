const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { User } = require('../../../models');
const response = require('../../../util/response');
const findUserByNickName = require('../service.register/findUserByNickName');

const register = async (req, res) => {
    const { loginId, password , nickname,  preferredPosition } = req.body;    
    try {

        const existedUser = await findUserByNickName(nickname);

        if(existedUser) {
            return response(res, 500, '가입된 유저가 존재하여 회원가입 할 수 없습니다.');
        }

        const hashedPassword = await bcrypt.hash(password, 10); 

        const user = await User.create({
            loginId : loginId,
            nickname : nickname,
            password: hashedPassword,
            preferredPosition : preferredPosition
        });

        return response(res, 200, user);

    } catch (err) {
        console.error(err);
        return response(res, 500, 'Failed to Create User');
    }
};

module.exports = {
    register
};