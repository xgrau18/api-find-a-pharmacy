import jwt, { VerifyErrors, TokenExpiredError } from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { auth_config } from "../config/auth-config";

export function verifyToken(req: Request, res: Response, next: NextFunction) {

    if (!req.headers['x-access-token']) {
        return res.status(403).send({ message: "No token provided!" });
    }

    // * Get token from headers
    let token = req.headers['x-access-token'];

    if (typeof token != "string") {
        return res.status(403).send({ message: "Token must be a string!" });
    }

    jwt.verify(token, auth_config.secret, (err, decoded) => {

        if (err) {
            return catchError(err, res)
        }

        next();

    });

}

function catchError(err: TokenExpiredError | VerifyErrors, res: Response) {

    if (err instanceof TokenExpiredError) {
        return res.status(401).send({ message: "Unauthorized! Access Token was expired!" });
    }

    return res.sendStatus(401).send({ message: "Unauthorized!" });

}