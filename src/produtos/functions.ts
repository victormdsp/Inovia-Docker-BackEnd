import { Request, Response } from "express";
import { products } from "../../models/ProductModel";
require('dotenv').config();
const jwt = require('jsonwebtoken');

//Get methods
export const getProductById = (req: Request, res: Response) => {
    products.findById(req.params.id)
        .then(product => {
            res.status(200).send(product);
        })
        .catch(err => {
            res.status(404).send(err.message);
        })
}

export const getProducts = (req: Request, res: Response) => {
    products.find()
        .then(allProducts => {
            res.status(200).send(allProducts);
        })
        .catch(err => {
            res.status(500).send(err.message);
        })
}


//Post methods
export const createNewProduct = (req: Request, res: Response) => {
    const data = req.body;
    console.log("Data: ", data);
    products.create(data)
        .then(product => {
            res.status(200).send(product);
        })
        .catch(err => {
            res.status(400).send({message: err.message});
        });
}

//Put methods
export const updateProduct = (req: Request, res: Response) => {
    products.findById(req.body._id)
        .then(async (product) => {
            product = Object.assign(product as any, req.body);
            product.save();
            res.status(200).send(product);
        })
        .catch(err => {
            res.status(404).send(err.message);
        })
}

//Delete methods
export const deleteProduct = (req: Request, res: Response) => {
    products.findById(req.params.id)
        .then(async (product) => {
            await products.deleteOne({_id: product._id});
            res.status(200).send({message: "Produto apagado."});
        })
        .catch(err => {
            res.status(404).send(err.message);
        });
}