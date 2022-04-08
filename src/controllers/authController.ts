import { Request, Response } from 'express';
import { sign } from 'jsonwebtoken';
import User from '../models/User';
import { auth_config } from '../config/auth-config';
import {refreshToken} from '../services/authService';

export async function signup(req: Request, res: Response) {

    // TODO: We need to hash the password see bcrypt library
    const newUser = new User({
        email: req.body.email,
        password: req.body.password
    });

    // * Verify if the user already exist
    const match = await User.findOne({ email: newUser.email });

    if (match) {
        return res.status(409).send({
            message: "User already exists"
        })
    }

    // TODO: Missing refresh token and access token creation
    newUser.save((err, doc) => {

        if (err) {
            return res.status(500).send({ message: `Error saving user ${err.message}` })
        }

        return res.status(200).send({
            message: "Successfully signup"
        })

    });

}

export async function signin(req: Request, res: Response) {

    // TODO: We need to hash the password see bcrypt library
    const authUser = new User({
        email: req.body.email,
        password: req.body.password
    });

    const dbUser = await User.findOne({ email: authUser.email });

    if (dbUser) {

        // * Validate password correct
        if (dbUser.password !== authUser.password) {
            return res.status(409).send( { message: "Credentials not valid" } )
        }

        let token = sign({ id: dbUser.id }, auth_config.secret, {
            expiresIn: auth_config.jwtExpiration
        });

        let _refreshToken = await refreshToken(dbUser);

        return res.status(200).send({
            message: "Successfully logged in",
            id: dbUser.id,
            email: dbUser.email,
            accessToken: token,
            refreshToken: _refreshToken
        });

    }

    return res.status(409).send( { message: "Credentials not valid" } )

}

export async function refreshtoken(req: Request, res: Response) {

    const authUser = new User({
        email: req.body.email,
        password: req.body.password
    });

    const dbUser = await User.findOne({ email: authUser.email });

    if (dbUser) {

        // * Validate password correct
        if (dbUser.password !== authUser.password) {
            return res.status(409).send( { message: "Credentials not valid" } )
        }


    }

    return res.status(409).send( { message: "Credentials not valid" } )

}