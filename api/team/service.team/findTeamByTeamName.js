const { Team } = require('../../../models');

module.exports = async (teamName) => {
    try {
        const team = await Team.findOne({
            where : {
                name : teamName
            }
        })
        return team
    } catch (err) {
        console.error(err);
    }
}