const { RefreshToken } = require('../../../models');
const models = require('../../data-access/sequelize/models');

module.exports = async (req, res) => {
    const RefreshToken = models.refresh_tokens;
    const refreshToken = req.query.refresh_token
    const token = await RefreshToken.findOne({
        where: { token: refreshToken}
    });
    console.log(refreshToken);
    if(!token) {
        return res.status(404).json({
            status: 'error',
            message: 'Token Invalid',
        })
    }
    return res.json({
        status: 'success',
        data: token
    })
}