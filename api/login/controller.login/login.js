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
            return response(res, 401, '존재하지 않는 유저입니다.');
        }

        const checkPassword = await bcrypt.compare(password, user.password);

        if (!checkPassword) {
            return response(res, 401, '비밀번호가 일치하지 않습니다.');
        }

        const token = jwt.sign(
            { userId: user.id, loginId: user.loginId },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        return response(res, 200, { message: '로그인 성공', token });

    } catch (err) {
        console.error(err);

        if (err.name === 'SequelizeConnectionError') {
            return response(res, 500, '데이터베이스 연결 오류');
        }

        return response(res, 500, '서버 오류로 인해 로그인에 실패했습니다.');
    }
}

module.exports = {
    login
};