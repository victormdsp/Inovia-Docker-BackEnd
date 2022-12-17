import { Router } from "express";
import { 
    getAll,
    getPedidosById,
    createNewPedido, 
    updateOnePedido,
    deletePedidoById,
} from "./functions";

const pedidosRoute: Router = Router();

//Get methods
pedidosRoute.get('/getAllPedidos', getAll);

pedidosRoute.get('/getMeusPedidos/:id', getPedidosById);

//Post methods
pedidosRoute.post('/createPedido', createNewPedido);

//Put methods
pedidosRoute.put('/updatePedido/:id', updateOnePedido);

//Delete methods
pedidosRoute.delete('/deletePedido/:id', deletePedidoById);

module.exports = pedidosRoute;