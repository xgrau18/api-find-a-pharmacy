import { NextFunction, Request, Response } from "express";

export function validateUserSchema(req: Request, res: Response, next: NextFunction) {

    if (!req.body.email) {
        return res.status(406).send({ message: "No email provided." });
    }

    if (!req.body.password) {
        return res.status(406).send({ message: "No password provided." });
    }

    next();
}