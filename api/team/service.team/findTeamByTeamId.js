const { Team } = require('../../../models')

module.exports = async (teamId) => {
    try {
        const team = await Team.findOne({
            where : {
                id : teamId
            }
        })
        return team
    } catch (err) {
        console.error(err);
    }
}