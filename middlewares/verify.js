const jwt = require('jsonwebtoken');

const verify = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Authorization header missing or malformed' });
        }

        const token = authHeader.split(' ')[1];
        const verified = jwt.verify(token, process.env.SECRET_KEY);
        if (verified) {
            next();
        } else {
            return res.status(401).json({ error: 'Token verification failed' });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = verify;