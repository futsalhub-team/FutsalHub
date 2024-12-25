const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { User } = require('../../../models');
const response = require('../../../util/response');

const login = async (req, res) => {
    const { loginId, password } = req.body;
    try {
        const user = await User.findOne({
            where: {
                loginId: loginId
            }
        });

        if (!user) {
            return response(res, 500, '존재하지 않는 유저입니다.');
        }

        const checkPassword = await bcrypt.compare(password, user.password);

        if (!checkPassword) {
            return response(res, 500, '비밀번호가 일치하지 않습니다.');
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        return response(res, 200, { token: token });

    } catch (err) {
        console.error(err);
        return response(res, 500, '로그인 실패');
    }
}

const logout = async (req, res) => {
    try {
        return response(res, 200, '로그아웃 성공');
    } catch (err) {
        console.error(err);
        return response(res, 500, '로그아웃 실패');
    }
}

module.exports = {
    login,
    logout
};