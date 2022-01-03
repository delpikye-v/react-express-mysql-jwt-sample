import jwt from 'jsonwebtoken';
import HttpException from '../utils/exceptions/http.exception.js';

const jwtAuthMiddleware = (req, res, next) => {
    const bearer = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers.authorization;

    if (!bearer || !bearer.startsWith('Bearer ')) {
        return next(new HttpException(403, 'A token is required for authentication!'));
    }

    let { JWT_SECRET } = process.env;
    const accessToken = bearer.split('Bearer ')[1].trim();

    try {
        const decoded = jwt.verify(accessToken, JWT_SECRET);
        req.user = decoded;
    } catch (err) {
        return res.status(401).send({
            error: true,
            message: 'Invalid Token'
        });
    }

    return next();
}

export default jwtAuthMiddleware
