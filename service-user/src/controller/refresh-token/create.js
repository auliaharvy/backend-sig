const models = require('../../data-access/sequelize/models');

const Validator = require('fastest-validator')
const v = new Validator();

module.exports = async (req, res) => {
    const userId = req.body.user_id;
    const refreshToken = req.body.refresh_token;
    //("user_id" ,userId)
    const schema = {
        refresh_token: 'string',
        user_id: 'string',

    }
    const validate = v.validate(req.body, schema);
    if(validate.length) {
        return res.status(400).json({
            status: 'error',
            message: validate
        })
    }

    //const user = await User.findByPk(userId);
    const User = models.Users;
    const RefreshToken = models.refresh_tokens;
    const user = await User.findByPk(userId);

    if(!user) {
        return res.status(404).json({
            status: 'error',
            message: 'User not found'
        })
    }

    const createrefreshToken = await RefreshToken.create({token: refreshToken, userId: userId});
    return res.json({
        status: 'success',
        data: createrefreshToken.id
    })
}