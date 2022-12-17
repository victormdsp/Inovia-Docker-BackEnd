const express = require("express");
const cors = require("cors");
const produtos = require('./produtos/routes');
const clientes = require('./clientes/routes');
const pedidos = require('./pedidos/routes');

import connectionMongo from './servers/mongodb';

const app = express();

connectionMongo();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

app.use('/', produtos);
app.use('/clientes', clientes);
app.use('/pedidos', pedidos)

app.listen(3001, () => console.log("App listening on PORT 3001"));

module.exports = app;