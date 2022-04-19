import {auth_config} from "../config/auth-config";
import {v4 as uuidv4} from "uuid";
import { User } from '../models/User'
import RefreshToken, { RefreshToken as RefreshTokenType } from "../models/RefreshToken";

export async function refreshToken(user: User) {

    if (await isTokenCreated(user)) {

        // TODO: See what can we do to suppress @ts-ignore
        // @ts-ignore
        let token: RefreshTokenType = await getUserToken(user);

        if (verifyTokenExpiration(token)) {
            return token.token;
        }

        await removeToken(user);
        return await createToken(user);

    }
    return await createToken(user);

}

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

async function removeToken(user: User) {
    await RefreshToken.deleteOne({ user: user._id });
}

export function verifyTokenExpiration(token: RefreshTokenType ) {
    return token.expiryDate.getTime() > new Date().getTime();
}

function isTokenCreated(user: User) {
    return getUserToken(user);
}

async function getUserToken(user: User) {
    return await RefreshToken.findOne({user: user._id });
}