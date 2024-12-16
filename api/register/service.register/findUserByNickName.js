const { User } = require('../../../models');

module.exports = async (nickName) => {
    try {
        const user = await User.findOne({
            where : {
                nickname : nickName
            }
        })
        return user
    } catch (err) {
        console.error(err);
    }
}