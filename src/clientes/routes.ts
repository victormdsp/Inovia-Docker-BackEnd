import { Router } from "express";
import { 
    getAll,
    getClientById,
    createNewClient, 
    updateOneClient,
    deleteClientById,
    loginClient,
    loginAuto
} from "./functions";

import verifyToken from "../auth/authController";

const clientsRoute: Router = Router();

//Get methods
clientsRoute.get('/getAllClients', getAll);

clientsRoute.get('/getOneClient/:id', getClientById);

clientsRoute.get('/loginAuto/:id', verifyToken , loginAuto);


//Post methods
clientsRoute.post('/createClient', createNewClient);

clientsRoute.post('/login', loginClient);

//Put methods
clientsRoute.put('/updateClient/:id', verifyToken, updateOneClient);

//Delete methods
clientsRoute.delete('/deleteClient/:id', deleteClientById);

module.exports = clientsRoute;