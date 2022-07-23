const userController  = require("../controller/user");
const { authJwtVerify } = require("../middleware")

module.exports = (app) => {
    app.get("/crm/api/v1/user",
    [authJwtVerify.verifyToken, authJwtVerify.checkIsAdmin], userController.findAllUser)
}