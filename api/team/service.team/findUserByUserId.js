const {User} = require('../../../models');

module.exports = async (userId) => {
    try {
        const user = await User.findOne({
            where: {
                id: userId
            }
        })
        
        if(user){
            return true;
        }else {
            return false;
        }

    } catch (err) {
        console.error(err);
    }
}