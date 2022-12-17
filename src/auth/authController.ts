import { NextFunction, Request, Response } from "express";

require('dotenv').config();
const jwt = require("jsonwebtoken");

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ');
    if(!token) {
        return res.status(403).send({auth: false, message: "Token não informado ou incorreto."});
    }

    jwt.verify(token[1], process.env.JWT_SECRET, (err: any, decoded: any) => {
        if(err) {
            return res.status(500).send({auth: false, message: "Falha ao autenticar o token."});
        }

        req.body.userId = decoded.id;
        next();
    });
}

export default verifyToken;