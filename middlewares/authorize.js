const jwt = require("jsonwebtoken");

const authorize = (roles) => {
    return (req, res, next) => {
        try {
            if (!req.user || !req.user.role) {
                return res.status(401).json({ message: "User information is missing or invalid." });
            }

            if (!roles.includes(req.user.role)) {
                return res.status(403).json({ message: "Access denied. You do not have the required permissions." });
            }

            next();
        } catch (error) {
            res.status(500).json({ message: "An error occurred during authorization.", error: error.message });
        }
    };
};

module.exports = authorize;