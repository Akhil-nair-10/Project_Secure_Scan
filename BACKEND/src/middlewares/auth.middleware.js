const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {

    const token = req.cookies.Token;

    if (!token) {
        return res.status(401).json({
            message: "Please login first."
        });
    }

    try {

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = decoded; //new property we added

        next();

    } catch (error) {

        return res.status(401).json({
            message: "Invalid or expired token."
        });

    }
}

module.exports = authMiddleware;