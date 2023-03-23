const { User } = require('../../../models');

module.exports = async (req, res) => {
    const userIds = req.query.userids || []

    const sqlOptions = {
        attributes: ['id', 'name', 'email','role','profession','avatar']
    }

    if (userIds.length) {
        sqlOptions.where = {
            id: userIds
        }
    }
    const user = await User.findAll(sqlOptions);

    if(!user) {
        return res.status(404).json({
            status: 'error',
            message: 'User not found'
        })
    }
    return res.json({
        status: 'success',
        data: user
    })
}