const { JWT_SECRET } = require("./config");
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log(authHeader);

    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({
            message: "Invalid authorization at middleware"
        })
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        if(decoded.userId) {
            req.userId = decoded.userId;
            next();
        }
        
    } catch (err) {
        return res.status(401).json({
            message: "Error while authorization",
            error: err
        })
    }
}

module.exports = {
    authMiddleware
}