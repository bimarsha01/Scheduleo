import jwt from 'jsonwebtoken'
import { createaccesstoken, createrefreshtoken } from '../tokens/token.tokens';


export const attachedcookiesToResponse = (res, user) => {
    accesstoken = createaccesstoken(user);
    refreshtoken = createrefreshtoken(user);

    res.cookie('accesstoken', accesstoken, {
        httpOnly: true,
        maxAge: 15 * 60 * 1000,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict',
    })
    res.cookie('refreshtoken', refreshtoken, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict',
    })
}