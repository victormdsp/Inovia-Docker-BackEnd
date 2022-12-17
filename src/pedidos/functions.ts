import { Request, Response } from "express"
import { QueryResult } from "pg";
import pgConnection from "../servers/postgres"

//Get methods
export const getAll = (req: Request, res: Response) => {
    pgConnection.query('SELECT * FROM "pedido"', (error: Error, results: QueryResult) => {
        if (error) res.status(404).send(error.message);
        else if (!results.rows[0]) res.status(200).send({ message: "Não foi encontrado nenhum pedido." })
        else {
            res.status(200).send(results.rows);
        }
    })
}

export const getPedidosById = (req: Request, res: Response) => {
    pgConnection.query('SELECT * FROM "pedido" WHERE clienteid = $1', [req.params.id], (error: Error, results: QueryResult) => {
        if (error) res.status(404).send(error.message);
        else if (!results.rows[0]) res.status(200).send({ message: "Não foi encontrado nenhum pedido." })
        else {
            res.status(200).send(results.rows);
        }
    })
}

//Post methods
export const createNewPedido = (req: Request, res: Response) => {
    const data = req.body;
    pgConnection.query('INSERT INTO "pedido" (clienteid, produtos, quantPorProduto, totalProdutos, dataPedido, totalPedido) VALUES ($1, $2, $3, $4, $5, $6 )',
        [data.clientid, data.produtos, data.quantPorProduto, data.totalProdutos, data.dataPedido, data.totalPedido],
        (error: Error, results: QueryResult) => {
            if (error) res.status(404).send(error.message);
            else {
                res.status(200).send(data)
            };
        })
}

//Put methods
export const updateOnePedido = (req: Request, res: Response) => {
    pgConnection.query('SELECT * FROM "pedido" WHERE id = $1', [req.params.id], (error: Error, results: QueryResult) => {
        if (error) res.status(500).send(error.message);
        else if (!results.rows[0]) res.status(200).send({ message: "Não foi possível encontrar nenhum pedido." });
        else {
            console.log("Entrou aqui")
            const data = Object.assign(results.rows[0], req.body);
            const dataSanitizer = {
                id: data.id,
                clientid: data.clienteid,
                produtos: data.produtos,
                quantPorProduto: data.quantPorProduto,
                totalProdutos: data.totalProdutos,
                dataPedido: data.dataPedido,
                totalPedido: data.totalPedido,
            }

            pgConnection.query('UPDATE "pedido" SET clienteid = $2, produtos = $3, quantPorProduto = $4, totalProdutos = $5, dataPedido = $6, totalPedido = $7 WHERE id = $1',
                [req.params.id, dataSanitizer.clientid, dataSanitizer.produtos, dataSanitizer.quantPorProduto, dataSanitizer.totalProdutos, dataSanitizer.dataPedido, dataSanitizer.totalPedido],
                (error: Error, results: QueryResult) => {
                    if (error) res.status(404).send(error.message);
                    else {
                        console.log("Data sanitizer:" ,dataSanitizer)
                        res.status(200).send(dataSanitizer)
                    };
                })
        }
    })
}

//Delete methods
export const deletePedidoById = (req: Request, res: Response) => {
    pgConnection.query('DELETE FROM "pedido" WHERE id = $1', [req.params.id], (error: Error, results: QueryResult) => {
        if (error) res.status(404).send(error.message);
        else if (results.rowCount == 0) res.status(200).send({ message: "Não foi encontrado nenhum pedido." })
        else {
            res.status(200).send({ message: "Usuário apagado com sucesso." })
        }
    })
}