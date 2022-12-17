create table cliente(
    ID SERIAL PRIMARY KEY NOT NULL,
    nome VARCHAR(30) NOT NULL,
    endereco VARCHAR(20) NOT NULL,
    telefone NUMERIC NOT NULL,
    email VARCHAR(30) NOT NULL,
    nascimento DATE NOT NULL,
    login VARCHAR(20) NOT NULL,
    senha VARCHAR(20) NOT NULL,
    foto VARCHAR(50) NOT NULL
);

create table pedido(
    ID SERIAL PRIMARY KEY NOT NULL,
    clienteid INTEGER NOT NULL,
    produtos JSON [] NOT NULL,
    quantPorProduto JSON [] NOT NULL,
    totalProdutos NUMERIC NOT NULL,
    dataPedido DATE NOT NULL,
    totalPedido NUMERIC NOT NULL
);