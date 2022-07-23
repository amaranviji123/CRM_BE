const User = require('../model/user.model');

const objectConverter = require('../utils/objectConverter')


exports.findAllUser = async(_req,res) => {
    try {
        let user = await User.find();

        user = objectConverter.userResponse(user);
        
        res.status(200).send(user)
    } catch (error) {
        res.status(500).send({
            message: 'Internal server error',
            errorMessage: error.message
        })
    }
}