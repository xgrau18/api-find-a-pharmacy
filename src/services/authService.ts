import {auth_config} from "../config/auth-config";
import {v4 as uuidv4} from "uuid";
import { User } from '../models/User'
import RefreshToken, { RefreshToken as RefreshTokenType } from "../models/RefreshToken";

async function createToken (user: User) {

    let expiredAt = new Date();

    expiredAt.setSeconds(
        expiredAt.getSeconds() + auth_config.jwtRefreshExpiration
    );

    let _token = uuidv4();
    let newRefreshToken = new RefreshToken({
        token: _token,
        user: user._id,
        expiryDate: expiredAt.getTime()
    });

    let refreshToken = await newRefreshToken.save();
    return refreshToken.token;
}

function verifyTokenExpiration(token: RefreshTokenType ) {
    return token.expiryDate.getTime() < new Date().getTime();
}