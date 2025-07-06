import jwt from 'jsonwebtoken';

export const createaccesstoken = (user) => {
    return jwt.sign(user, process.env.JWT_SECRET_ACCESS, { expiresIn: '15m' });
};

export const createrefreshtoken = (user) => {
    return jwt.sign(user, process.env.JWT_SECRET_REFRESH, { expiresIn: '7d' });
};


