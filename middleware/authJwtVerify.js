const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.config');
const User = require('../model/user.model');
const contant = require('../utils/constant'); 

exports.verifyToken = (req, res, next) => {
    try {
        let headers = req.headers['x-access-token'];

        if(!headers){
            return res.status(403).send({
                message: 'No Token is provided'
            })
        }
        jwt.verify(headers,authConfig.secret, (err,decode) => {
            if(err){
                return res.status(401).send({
                    message: "Unauthorized User"
                })
            }

            req.userId = decode.id;

            next();
        })
        
    } catch (error) {
        res.status(500).send({
            message: 'Internal Server Error',
            errorMessage: error.message
        })
    }
}

exports.checkIsAdmin = async(req, res, next) => {
    try {
        let user = await User.find({userId: req.userId});

        if(user.userType !== contant.userTypes.admin){
            return res.status(401).send({
                message: "Don't have permission to access"
            })
        }
        next()
    } catch (error) {
        res.status(500).send({
            message: 'Internal Server Error',
            errorMessage: error.message
        })
    }

}