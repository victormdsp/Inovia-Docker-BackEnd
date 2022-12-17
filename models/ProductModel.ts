import { Schema, model } from 'mongoose';

const Produto: any = new Schema({
    nome:{
        type: String,
        required: true
    },
    preco:{
        type: Number,
        required: true
    },
    marca:{
        type: String,
        required: true
    },
    imposto:{
        type: Number,
        required: true
    },
    quantEstoque:{
        type: Number,
        required: true
    },
    imagem:{
        type: String,
        required: true
    },
    caracteristicas:{
        type: Array,
        required: true
    },
})

export const products = model("Produto", Produto);