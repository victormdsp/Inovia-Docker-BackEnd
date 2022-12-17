import { Request, Response } from "express";
import { QueryResult } from "pg";
import pgConnection from "../servers/postgres";
require('dotenv').config();
const jwt = require('jsonwebtoken');

//Get methods
export const getAll = (req: Request, res: Response) => {
    pgConnection.query('SELECT * FROM "cliente"', (error: Error, results: QueryResult) => {
        if (error) res.status(500).send(error.message);
        else if (!results.rows[0]) res.status(200).send({ message: "Não foi possível encontrar nenhum usuário." });
        else {
            res.status(200).send(results.rows)
        };
    });
}
export const getClientById = (req: Request, res: Response) => {
    pgConnection.query('SELECT * FROM "cliente" WHERE id = $1', [req.params.id], (error: Error, results: QueryResult) => {
        if (error) res.status(500).send(error.message);
        else if (!results.rows[0]) res.status(200).send({ message: "Não foi possível encontrar nenhum usuário." });
        else {
            res.status(200).send(results.rows[0])
        };
    })
}

export const loginAuto = (req: Request, res: Response) => {
    pgConnection.query('SELECT * FROM "cliente" WHERE id = $1', [req.params.id], (error: Error, results: QueryResult) => {
        if (error) res.status(500).send(error.message);
        else if (!results.rows[0]) res.status(200).send({ message: "Não foi possível encontrar nenhum usuário." });
        else {
            res.status(200).send(results.rows[0])
        };
    })
}

//Post methods
export const createNewClient = (req: Request, res: Response) => {
    const data = req.body;
    pgConnection.query('INSERT INTO "cliente" (nome, endereco, telefone, email, nascimento, login, senha, foto) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
        [data.nome, data.endereco, data.telefone, data.email, data.nascimento, data.login, data.senha, data.foto],
        (error: Error, results: QueryResult) => {
            if (error) res.status(400).send(error.message);
            else {
                const token = jwt.sign({ id: data._id }, process.env.JWT_SECRET, {
                    expiresIn: 86400
                })
                res.status(200).send({ auth: true, token: token })
            };
        }
    )
}

export const loginClient = (req: Request, res: Response) => {
    const data = req.body;
    pgConnection.query('SELECT * FROM "cliente" WHERE login = $1 AND senha = $2', [data.login, data.senha], (error: Error, results: QueryResult) => {
        if (error) res.status(400).send(error.message);
        else if (!results.rows[0]) res.status(200).send({ status: "invalid"});
        else {
            const dataResponse = results.rows[0];
            console.log("dataResponse: ", dataResponse);
            const token = jwt.sign({id: dataResponse.id}, process.env.JWT_SECRET, {
                expiresIn: 86400
            })
            res.status(200).send({auth: true, token: token, user: dataResponse})
        };
    })
}

//Put methods
export const updateOneClient = (req: Request, res: Response) => {
    pgConnection.query('SELECT * FROM "cliente" WHERE id = $1', [req.params.id], (error: Error, results: QueryResult) => {
        if (error) res.status(500).send(error.message);
        else if (!results.rows[0]) res.status(200).send({ message: "Não foi possível encontrar nenhum usuário." });
        else {
            const data = Object.assign(results.rows[0], req.body);
            pgConnection.query('UPDATE "cliente" SET nome = $2, endereco = $3, telefone = $4, email = $5, nascimento = $6, login = $7, senha = $8, foto = $9 WHERE id = $1',
                [req.params.id, data.nome, data.endereco, data.telefone, data.email, data.nascimento, data.login, data.senha, data.foto],
                (error: Error, results: QueryResult) => {
                    if (error) res.status(400).send(error.message);
                    else {
                        res.status(200).send(data)
                    };
                }
            )
        };
    })
}

//Delete methods
export const deleteClientById = (req: Request, res: Response) => {
    pgConnection.query('DELETE FROM "cliente" WHERE id = $1 ', [req.params.id], (error: Error, results: QueryResult) => {
        if (error) res.status(404).send(error.message);
        else if (results.rowCount == 0) res.status(200).send({ message: "Não foi possível encontrar nenhum usuário." });
        else {
            res.status(200).send({ message: "Usuário apagado com sucesso." })
        };
    })
}