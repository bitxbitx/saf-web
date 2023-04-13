const createError = require('http-errors');
const { signAccessToken, signRefreshToken, verifyRefreshToken, verifyAccessToken } = require('../config/jwtHelper');

const protect = async (req, res, next) => {
    const { accessToken, refreshToken } = req.cookies;

    if (!accessToken && !refreshToken) {
        res.status(401);
        next(createError.Unauthorized('Not authorized, no token'));
    }

    // Check if the access token is valid
    try {
        const payload = await verifyAccessToken(accessToken);
        req.userId = payload.userId;
        next();
    } catch (error) {
        // Return Unauthorized if the access token is invalid
        if (error.name === 'JsonWebTokenError') {
            res.status(401);
            next(createError.Unauthorized('Not authorized, invalid token'));
        }
        // Return Forbidden if the access token is expired
        else if (error.name === 'TokenExpiredError') {
            res.status(403);
            next(createError.Forbidden('Not authorized, token expired'));
        }
        // Return Internal Server Error if the access token is invalid
        else {
            res.status(500);
            next(createError.InternalServerError('Internal Server Error'));
        }
    }
}

module.exports = { protect };