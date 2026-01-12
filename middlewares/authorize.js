const jwt = require("jsonwebtoken");
const authorize = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            const error = new Error("Not Authorized!!!");
            next(error);
        }
        next()
    }
}
module.exports = authorize;