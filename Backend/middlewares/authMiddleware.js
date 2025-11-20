import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.SECRET_KEY || 'your_super_secret_key_change_me';

const COOKIE_NAME = 'authToken';

export const setAuthCookie = (Response, payload) => {
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });

    Response.cookie(COOKIE_NAME, token, {
        httpOnly: true,
        secure: false,
        sameSite: 'none',
        maxAge: 7 *24 * 60 * 60 * 1000, // 7 day
    });
};

export const clearAuthCookie = (Response) => {
    Response.cookie(COOKIE_NAME, '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        expires: new Date(0),
    });
};

export const authenticateJWT = (Request, Response, Next) => {
    const token = Request.cookies[COOKIE_NAME];

    console.log("authenticate cookie", token);

    if (!token) {
        return Response.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET).userID;
        Request.body.userID = decoded; 
        console.log("decoded : ", decoded);
        Next(); 

    } catch (error) {
        console.error('JWT verification failed:', error.message);
        clearAuthCookie(Response);
        return Response.status(401).json({ message: 'Invalid or expired token.' });
    }
};
