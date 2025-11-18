import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.SECRET_KEY || 'your_super_secret_key_change_me';
const COOKIE_NAME = 'authToken';

export const setAuthCookie = (res, payload) => {
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });

    res.cookie(COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 *24 * 60 * 60 * 1000, // 7 day
    });
};

export const clearAuthCookie = (res) => {
    res.cookie(COOKIE_NAME, '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        expires: new Date(0),
    });
};

export const authenticateJWT = (req, res, next) => {
    const token = req.cookies[COOKIE_NAME];

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; 
        next(); 

    } catch (error) {
        console.error('JWT verification failed:', error.message);
        clearAuthCookie(res);
        return res.status(401).json({ message: 'Invalid or expired token.' });
    }
};
